// Lock and Condition are inspired by Lars T. Hansen's work in this github repo:
// https://github.com/lars-t-hansen/js-lock-and-condition
// The API of these is not the same as the ones there, but the inner workings are
// very similar. But if you find a bug, assume it's mine, not Hansen's.

/**
 * Utility function used by `Lock` and `Condition` to check arguments to their
 * constructors and certain methods that take the arguments this function takes.
 *
 * @param   {SharedArrayBuffer} sab         The buffer to check.
 * @param   {number}            byteOffset  The offset to validate.
 * @param   {number}            bytesNeeded The number of bytes needed at
 *                                          that offset.
 * @throws  {Error} If any of the requirements aren't met.
 */
function checkArguments(sab, byteOffset, bytesNeeded) {
    if (!(sab instanceof SharedArrayBuffer)) {
        throw new Error("`sab` must be a SharedArrayBuffer");
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
            ```byteOffset`` must be an integer divisible by 4 and identify a ` +
            `buffer location with ${bytesNeeded} of room`
        );
    }
}

// State values used by `Lock` and `Condition`; these MUST be the values 0, 1,
// and 2 as below or the implementation of `unlock` will fail (the names are
// just for reading clarity):
const UNLOCKED = 0;     // The lock is unlocked, available to be acquired.
const LOCKED = 1;       // The lock is locked, and no threads are waiting.
const CONTENDED = 2;    // The lock is locked, and there may be at least one
                        // thread waiting to be notified that the lock was
                        // released.

/**
 * Class implementing a lock using a given region of a `SharedArrayBuffer`.
 *
 * You create a new lock within a SAB by using `new Lock` to initialize the SAB
 * and get a `Lock` instance for accessing it. To use an existing `Lock` in a
 * SAB, you must use `Lock.deserialize` to deserialize the object created by
 * `serialize`, **NOT** `new Lock`.
 */
export class Lock {
    // Implementation Notes:
    //
    // Lock state is a single 32-bit entry in a SharedArrayBuffer (via
    // Int32Array). That entry must be initialized to a known state before it
    // can be used for locking (`Lock.initialize`). Once initialized, the entry
    // may have the value `UNLOCKED`, `LOCKED`, or `CONTENDED`.
    //
    // This class makes no attempt to ensure that the code unlocking a lock
    // is the code that acquired the lock in the first place. This is for
    // simplicity and performance.

    /**
     * Creates a lock in the given `SharedArrayBuffer` and returns a `Lock`
     * instance that can use the lock or be serialized to be given to other code
     * to use (via `Lock.deserialize`).
     *
     * @param   {SharedArrayBuffer} sab         The buffer to use.
     * @param   {number}            byteOffset  The offset of the region in the
     *                                          buffer to use. The `Lock` object
     *                                          will use `Lock.BYTES_NEEDED`
     *                                          bytes.
     */
    constructor(sab, byteOffset) {
        checkArguments(sab, byteOffset, Lock.BYTES_NEEDED);
        this.sharedState = new Int32Array(sab);
        this.index = byteOffset / 4; // byte offset => Int32Array index
        Atomics.store(this.sharedState, this.index, UNLOCKED);
    }

    /**
     * Gets the `SharedArrayBuffer` this `Lock` instance uses.
     */
    get buffer() {
        return this.sharedState.buffer;
    }

    /**
     * Gets the lock. Waits forever until it succeeds. Cannot be used by the main
     * thread of many environments (including browsers), because the thread may
     * need to enter a wait state, and the main thread isn't allowed to do that in
     * many environments.
     */
    lock() {
        const {sharedState, index} = this;
        // Try to get the lock by replacing an existing `UNLOCKED` value with
        // `LOCKED`. `compareExchange` returns the value that was at the given
        // index before the exchange was made, whether the exchange was made
        // or not.
        let c = Atomics.compareExchange(
                    sharedState,
                    index,
                    UNLOCKED,   // If the entry contains `UNLOCKED`,
                    LOCKED      // replace it with `LOCKED`.
                );
        // If `c` is `UNLOCKED`, this thread got the lock. If not, loop until
        // it does.
        while (c !== UNLOCKED) {
            // Wait if `c` is already `CONTENDED` or if this thread's attempt
            // to replace `LOCKED` with `CONTENDED` didn't find that it has
            // been replaced with `UNLOCKED` in the meantime.
            const wait =
                c === CONTENDED
                ||
                Atomics.compareExchange(
                    sharedState,
                    index,
                    LOCKED,     // If the entry contains `LOCKED`,
                    CONTENDED   // replace it with `CONTENDED`.
                ) !== UNLOCKED;
            if (wait) {
                // Only enter a wait state if the value as of when this thread
                // starts waiting is `CONTENDED`.
                Atomics.wait(sharedState, index, CONTENDED);
            }
            // The thread gets here in one of three ways:
            // 1. It waited and got notified, or
            // 2. It tried to replace `LOCKED` with `CONTENDED` and found that
            // `UNLOCKED` was there now.
            // 3. It tried to wait, but the value that was there when it would
            // have started waiting wasn't `CONTENDED`.
            // Try to replace `UNLOCKED` with `CONTENDED`.
            c = Atomics.compareExchange(sharedState, index, UNLOCKED, CONTENDED);
        }
    }

    /**
     * Releases the lock.
     */
    unlock() {
        const {sharedState, index} = this;
        // Subtract one from the current value in the state and get the old value
        // that was there. This converts `LOCKED` to `UNLOCKED`, or converts
        // `CONTENDED` to `LOCKED` (or if erroneously called when the lock is not
        // locked) converts `UNLOCKED` to `-1`.
        const value = Atomics.sub(sharedState, index, 1);
        // If the old value was `LOCKED`, we're done; it's `UNLOCKED` now.
        if (value !== LOCKED) {
            // The old value wasn't `LOCKED`. Normally this means it was
            // `CONTENDED` and one or more threads may be waiting for the lock to
            // be released. Do so, and notify up to one thread.
            Atomics.store(sharedState, index, UNLOCKED);
            Atomics.notify(sharedState, index, 1);
            // max number of threads to notify ^
        }
    }

    /**
     * Serializes this `Lock` object into an object that can be used with
     * `postMessage`.
     *
     * @returns The object to use with `postMessage`.
     */
    serialize() {
        return {
            isLockObject: true,
            sharedState: this.sharedState,
            index: this.index
        };
    }

    /**
     * Deserializes the object from `serialize` back into a useable `Lock`.
     *
     * @param   {object} obj The serialized `Lock` object
     * @returns The `Lock` instance.
     */
    static deserialize(obj) {
        if (!obj || !obj.isLockObject ||
            !(obj.sharedState instanceof Int32Array) ||
            typeof obj.index !== "number"
            ) {
            throw new Error("`obj` is not a serialized `Lock` object");
        }
        const lock = Object.create(Lock.prototype);
        lock.sharedState = obj.sharedState;
        lock.index = obj.index;
        return lock;
    }
}
Lock.BYTES_NEEDED = Int32Array.BYTES_PER_ELEMENT; // Lock uses just one entry

/**
 * Class implementing condition variables using a given lock and a given region of
 * a `SharedArrayBuffer` (a different region in the same buffer the `Lock` uses).
 *
 * A new condition variable is created in a SAB by using `new Condition`, which
 * sets the region of the SAB to initial values and returns a `Condition` object
 * that can be used to access the condition variable. Other code can use the
 * condition variable by using `Condition.deserialize` (**NOT** `new Condition`)
 * on the object created by `serialize` to gain access to the condition variable.
 */
export class Condition {
    /**
     * Creates a `Condition` object that uses the given `Lock` and state
     * information in the given region of the buffer the `Lock` uses. This region
     * must have been initialized at some point by `Condition.initialize` and
     * must not overlap regions used by the `Lock` or any other `Condition`.
     *
     * @param   {Lock}      lock        The lock to use.
     * @param   {number}    byteOffset  The offset of the region in the `Lock`'s
     *                                  buffer to use. Will use
     *                                  `Condition.BYTES_NEEDED` bytes starting
     *                                  at that offset.
     */
    constructor(lock, byteOffset, noInit = false) {
        if (!(lock instanceof Lock)) {
            throw new Error("`lock` must be a `Lock` instance");
        }
        const sab = lock.buffer;
        checkArguments(sab, byteOffset, Condition.BYTES_NEEDED);
        this.sharedState = new Int32Array(sab);
        this.index = byteOffset / 4; // byte offset => Int32Array index
        this.lock = lock;
        Atomics.store(this.sharedState, this.index, 0);
    }

    /**
     * Unlocks this `Condition`'s `Lock` and waits to be notified of the condition.
     * The calling code must have the lock.
     */
    wait() {
        const {sharedState, index, lock} = this;
        const sequence = Atomics.load(sharedState, index);
        lock.unlock();
        Atomics.wait(sharedState, index, sequence);
        lock.lock();
    }

    /**
     * Notify one waiting thread. Typically code does this when the condition has
     * become "true" (whatever meaning that has for a particular condition).
     * The calling code must have the lock.
     */
    notifyOne() {
        const {sharedState, index} = this;
        Atomics.add(sharedState, index, 1);     // Move the sequence on by one
        Atomics.notify(sharedState, index, 1);  // 1 = notify one thread
    }

    /**
     * Notify all waiting threads. Typically code does this when the condition has
     * become "true" (whatever meaning that has for a particular condition).
     * The calling code must have the lock.
     */
    notifyAll() {
        const {sharedState, index} = this;
        Atomics.add(sharedState, index, 1);     // Move the sequence on by one
        Atomics.notify(sharedState, index);     // No 3rd arg = notify all threads
    }

    /**
     * Serializes this `Condition` object into an object that can be used with
     * `postMessage`.
     *
     * @returns The object to use with `postMessage`.
     */
    serialize() {
        return {
            isConditionObject: true,
            sharedState: this.sharedState,
            index: this.index,
            lock: this.lock.serialize()
        };
    }

    /**
     * Deserializes the object from `serialize` back into a useable `Condition`.
     *
     * @param   {object}    obj The serialized `Condition` object
     * @returns The `Lock` instance.
     */
    static deserialize(obj) {
        if (!obj || !obj.isConditionObject ||
            !(obj.sharedState instanceof Int32Array) ||
            typeof obj.index !== "number"
            ) {
            throw new Error("`obj` is not a serialized `Condition` object");
        }
        const condition = Object.create(Condition.prototype);
        condition.sharedState = obj.sharedState;
        condition.index = obj.index;
        condition.lock = Lock.deserialize(obj.lock);
        return condition;
    }
}
Condition.BYTES_NEEDED = Int32Array.BYTES_PER_ELEMENT;
