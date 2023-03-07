import {log, setLogging} from "./example-misc.js";
import {LockingInt32Queue} from "./locking-int32-queue.js";

// The basic flag for whether this consumer should keep running.
// Set by the `init` message, cleared by the `stop` message or on receipt of a
// buffer ID of -1.
let running = false;

// The ID this consumer uses when calling `log`, set by `init`
let logId;

// This consumer's ID, and the queues and buffers to use (set by `init`)
let consumerId = null;
let availableBuffersQueue;
let pendingBuffersQueue;
let buffers;
let fullspeed;

// The "now" function we'll use to time waiting for queue operations
const now = typeof performance !== "undefined" && performance.now
                ? performance.now.bind(performance)
                : Date.now.bind(Date);

// An array we use to wait within `calculateHash`, see below
const a = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));

// Calculates the hash for the given buffer.
function calculateHash(buffer) {
    // A real hash calculation like SHA-256 or even MD5 would take much longer than
    // the below, so after doing the basic XOR hash (which isn't a reliable hash,
    // it's just to keep things simple), this code waits a few milliseconds to
    // avoid completely overloading the main thread with messages. Real code
    // probably wouldn't do that, since the point of offloading the work to a
    // worker is to move work that takes a fair bit of time off the main thread.
    const hash = buffer.reduce((acc, val) => acc ^ val, 0);
    if (!fullspeed) {
        Atomics.wait(a, 0, 0, 10);
    }
    return hash;
}

// Processes buffers until either the `running` flag is no longer true or it's time
// to yield briefly to the event loop in order to receive any pending messages.
function processBuffers() {
    const yieldAt = Date.now() + 500;
    while (running) {
        log(logId, "Getting buffer to process");
        let waitStart = now();
        const bufferId = pendingBuffersQueue.take();
        let elapsed = now() - waitStart;
        log(logId, `Got bufferId ${bufferId} (elapsed: ${elapsed})`);
        if (bufferId === -1) {
            // This is a flag from the producer that this consumer should stop
            actions.stop();
            break;
        }
        log(logId, `Hashing buffer ${bufferId}`);
        const hash = calculateHash(buffers[bufferId]);
        postMessage({type: "hash", consumerId, bufferId, hash});
        waitStart = now();
        availableBuffersQueue.put(bufferId);
        elapsed = now() - waitStart;
        log(logId, `Done with buffer ${bufferId} (elapsed: ${elapsed})`);
        if (Date.now() >= yieldAt) {
            log(logId, `Yielding to handle messages`);
            setTimeout(processBuffers, 0);
            break;
        }
    }
}

// Handle messages, take appropriate action
const actions = {
    // Initialize this consumer with data from the message
    init(data) {
        ({consumerId, buffers, fullspeed} = data);
        setLogging(!fullspeed);
        logId = `consumer${consumerId}`;
        availableBuffersQueue =
            LockingInt32Queue.deserialize(data.availableBuffersQueue);
        pendingBuffersQueue =
            LockingInt32Queue.deserialize(data.pendingBuffersQueue);
        log(logId, "Running");
        running = true;
        processBuffers();
    },
    // Stop this consumer
    stop() {
        if (running) {
            running = false;
            log(logId, "Stopped");
        }
    }
}
self.addEventListener("message", ({data}) => {
    const action = data && data.type && actions[data.type];
    if (action) {
        action(data);
    }
});
