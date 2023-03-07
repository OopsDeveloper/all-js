// Ring buffer implementation drawn in part from
// https://www.snellman.net/blog/archive/2016-12-13-ring-buffers/
// Note that it relies on Uint32 wrap-around from 2**32-1 to 0
// on increment.

import {Lock, Condition} from "./lock-and-condition.js";

// Indexes of the head and tail indexes in the `indexes` array of
// `LockingInt32Queue`.
const HEAD = 0;
const TAIL = 1;

/**
 * Validates the given queue capacity, throws error if invalid.
 *
 * @param {number} capacity The size of the queue
 */
function validateCapacity(capacity) {
    const capLog2 = Math.log2(capacity);
    if (capLog2 !== (capLog2|0)) {
        throw new Error(
            "`capacity` must be a power of 2 (2, 4, 8, 16, 32, 64, etc.)"
        );
    }
}

/**
 * Converts the given number to Uint32 (and then back to number), applying
 * standard unsigned 32-bit integer wrap-around. For example, -4294967294 converts
 * to 2.
 *
 * @param   {number}    n   The number to convert.
 * @returns The result.
 */
function toUint32(n) {
    // The unsigned right-shift operator converts its operands to Uint32 values,
    // so shifting `n` by 0 places converts it to Uint32 (and then back to number)
    return n >>> 0;
}

// Utility functions for LockingInt32 Queue
// These will be useful private methods when private methods are further along.

/**
 * Gets the size of the given queue (the number of unconsumed entries in it).
 * **MUST** be called only from code holding the queue's lock.
 *
 * @param   {LockingInt32Queue} queue   The queue to get the size of.
 * @returns The number of unconsumed entries in the queue.
 */
function size(queue) {
    // Conversion to Uint32 (briefly) handles the necessary wrap-around so that
    // when the head index is (for instance) 1 and the tail index is (for
    // instance) 4294967295, the result is 2 (there's an entry at index
    // 4294967295 % capacity and also one at index 0), not -4294967294.
    return toUint32(queue.indexes[HEAD] - queue.indexes[TAIL]);
}

/**
 * Determines whether the given queue is full.
 * **MUST** be called only from code holding the queue's lock.
 *
 * @param   {LockingInt32Queue} queue   The queue to check.
 * @returns `true` if the queue is full, `false` if not.
 */
function full(queue) {
    return size(queue) === queue.data.length;
}

/**
 * Determines whether the given queue is empty.
 * **MUST** be called only from code holding the queue's lock.
 *
 * @param   {LockingInt32Queue} queue   The queue to check.
 * @returns `true` if the queue is full, `false` if not.
 */
function empty(queue) {
    return queue.indexes[HEAD] === queue.indexes[TAIL];
}

/**
 * Checks the value to see that it's valid for the queue.
 * Throws an error if the value is invalid.
 *
 * @param {number} v The value to check.
 */
function checkValue(v) {
    if (typeof v !== "number" || (v|0) !== v) {
        throw new Error(
            "Queue values must be integers between -(2**32) and 2**32-1, inclusive"
        );
    }
}

/**
 * Puts the given value into the given queue. Caller **MUST** check that there is
 * room in the queue before calling this method, while having the queue locked.
 * **MUST** be called only from code holding the queue's lock.
 *
 * @param   {LockingInt32Queue} queue   The queue to put the value in.
 * @param   {number}            value   The value to put.
 */
function internalPut(queue, value) {
    queue.data[queue.indexes[HEAD] % queue.data.length] = value;
    ++queue.indexes[HEAD];
}

/**
 * A queue of Int32 values with an associated `Lock` instance whose `put` method
 * blocks until there's room in the queue and whose `take` method blocks until
 * there's an entry in the queue to return.
 */
export class LockingInt32Queue {
    /**
     * Gets the number of bytes this queue implementation requires within a
     * `SharedArrayBuffer` to support a queue of the given capacity.
     *
     * @param   {number}    capacity    The desired queue capacity.
     */
    static getBytesNeeded(capacity) {
        validateCapacity(capacity);
        const bytesNeeded = Lock.BYTES_NEEDED +
                            (Condition.BYTES_NEEDED * 2) +
                            (Uint32Array.BYTES_PER_ELEMENT * 2) +
                            (Int32Array.BYTES_PER_ELEMENT * capacity);
        return bytesNeeded;
    }

    /**
     * Creates a new queue with the given capacity, optionally using the given
     * `SharedArrayBuffer` at the given byte offset (if not given, a new buffer
     * of the appropriate size is created). The constructor is **only** for
     * creating a new queue, not using an existing one; for that, use
     * `LockingInt32Queue.deserialize` on the object returned by the `serialize`
     * method of the queue instance.
     *
     * @param   {number}            capacity        The maximum number of entries
     *                                              the queue can contain.
     * @param   {SharedArrayBuffer} sab             The `SharedArrayBuffer` the
     *                                              queue should be maintained in.
     *                                              If you're supplying this arg,
     *                                              use the `getBytesNeeded` static
     *                                              method to get the number of
     *                                              bytes the queue will need.
     * @param   {number}            byteOffset      The byte offset within the SAB
     *                                              where the queue's state
     *                                              information should be stored.
     * @param   {number[]}          initialEntries  Optional entries to pre-seed
     *                                              the queue with.
     */
    constructor(capacity, sab = null, byteOffset = 0, initialEntries = null) {
        const bytesNeeded = LockingInt32Queue.getBytesNeeded(capacity);
        if (sab === null) {
            if (byteOffset !== 0) {
                throw new Error(
                    "`byteOffset` must be omitted or 0 when `sab` is " +
                    "omitted or `null`"
                );
            }
            sab = new SharedArrayBuffer(byteOffset + bytesNeeded);
        }
        // Offset must be an integer identifying a position within the buffer,
        // divisible by four because we use an Int32Array so we can use
        // `Atomics.compareExchange`. It needs to have at least the given number of
        // bytes available at that position.
        if ((byteOffset|0) !== byteOffset
            || byteOffset % 4 !== 0
            || byteOffset < 0
            || byteOffset + bytesNeeded > sab.byteLength
        ) {
            throw new Error(
                `\`byteOffset\` must be an integer divisible by 4 and ` +
                `identify a buffer location with ${bytesNeeded} of room`
            );
        }

        // Create the lock and conditions
        this.byteOffset = byteOffset;
        let n = byteOffset;
        this.lock = new Lock(sab, n);
        n += Lock.BYTES_NEEDED;
        this.hasWorkCondition = new Condition(this.lock, n);
        n += Condition.BYTES_NEEDED;
        this.hasRoomCondition = new Condition(this.lock, n);
        n += Condition.BYTES_NEEDED;
        // Create the indexes and data arrays
        this.indexes = new Uint32Array(sab, n, 2);
        Atomics.store(this.indexes, HEAD, 0);
        Atomics.store(this.indexes, TAIL, 0);
        n += Uint32Array.BYTES_PER_ELEMENT * 2;
        this.data = new Int32Array(sab, n, capacity);
        if (initialEntries) {
            if (initialEntries.length > capacity) {
                throw new Error(
                    `\`initialEntries\` has ${initialEntries.length} entries, ` +
                    `queue only supports ${capacity} entries`
                );
            }
            for (const value of initialEntries) {
                checkValue(value);
                internalPut(this, value);
            }
        }
    }

    /**
     * The capacity of this queue.
     */
    get capacity() {
        return this.data.length;
    }

    /**
     * Locks the queue, puts the given value into it, and releases the lock.
     * Waits forever for the lock (no timeout) and for the queue to have room for
     * a new entry.
     *
     * @param   {number}    value   The value to put. Must be a number
     *                              representing a 32-bit unsigned integer.
     * @returns The size of the queue as of just after this value was put in (may
     *          be out of date the instant the caller receives it, though).
     */
    put(value) {
        checkValue(value);
        this.lock.lock();
        try {
            // If the queue is full, wait for the "queue has room" condition to
            // become true. Since waiting releases and reacquires the lock, after
            // waiting check again whether the queue is full in case another thread
            // snuck in and used up the space that became available before this
            // thread could use it.
            while (full(this)) {
                this.hasRoomCondition.wait();
            }
            internalPut(this, value);
            const rv = size(this);
            // Notify one thread waiting in `take`, if any, that the queue has work
            // available now
            this.hasWorkCondition.notifyOne();
            return rv;
        } finally {
            this.lock.unlock();
        }
    }

    /**
     * Locks the queue, takes the next value from it, unlocks the queue, and
     * returns the value. Waits forever for the lock and for the queue to have
     * at least one entry in it.
     */
    take() {
        this.lock.lock();
        try {
            // If the queue is empty, wait for the "queue has work" condition to
            // become true. Since waiting releases and reacquires the lock, after
            // waiting check again whether the queue is empty in case another
            // thread snuck in and took the work that was just added before this
            // thread could get it.
            while (empty(this)) {
                this.hasWorkCondition.wait();
            }
            const value = this.data[this.indexes[TAIL] % this.data.length];
            ++this.indexes[TAIL];
            // Notify one thread waiting in `put`, if any, that there's room for
            // a new entry in the queue now
            this.hasRoomCondition.notifyOne();
            return value;
        } finally {
            this.lock.unlock();
        }
    }

    /**
     * Serializes this `LockingInt32Queue` object into an object that can be used
     * with `postMessage`.
     *
     * @returns The object to use with `postMessage`.
     */
    serialize() {
        return {
            isLockingInt32Queue: true,
            lock: this.lock.serialize(),
            hasWorkCondition: this.hasWorkCondition.serialize(),
            hasRoomCondition: this.hasRoomCondition.serialize(),
            indexes: this.indexes,
            data: this.data,
            name: this.name
        };
    }

    /**
     * Deserializes the object from `serialize` back into a useable `Lock`.
     *
     * @param   {object} obj The serialized `Lock` object
     * @returns The `Lock` instance.
     */
    static deserialize(obj) {
        if (!obj || !obj.isLockingInt32Queue ||
            !(obj.indexes instanceof Uint32Array) ||
            !(obj.data instanceof Int32Array)
        ) {
            throw new Error(
                "`obj` is not a serialized `LockingInt32Queue` object"
            );
        }
        const q = Object.create(LockingInt32Queue.prototype);
        q.lock = Lock.deserialize(obj.lock);
        q.hasWorkCondition = Condition.deserialize(obj.hasWorkCondition);
        q.hasRoomCondition = Condition.deserialize(obj.hasRoomCondition);
        q.indexes = obj.indexes;
        q.data = obj.data;
        q.name = obj.name;
        return q;
    }
}
