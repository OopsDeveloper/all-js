// This is the `postMessage`+transferables version of example-consumer.js

import {log, setLogging} from "./example-misc.js";

// The ID this consumer uses when calling `log`, set by `init`
let logId;

// This consumer's ID and the fullspeed flag
let consumerId = null;
let fullspeed;

// An array we use to wait within `calcluateHash`, see below
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

// Handle messages, take appropriate action
const actions = {
    // Initialize this consumer with data from the message
    init(data) {
        ({consumerId, fullspeed} = data);
        setLogging(!fullspeed);
        logId = `consumer${consumerId}`;
        log(logId, "Running");
    },
    // Hash the given buffer
    hash(data) {
        const {buffer, bufferId} = data;
        log(logId, `Hashing buffer ${bufferId}`);
        const hash = calculateHash(buffer);
        self.postMessage(
            {type: "hash", hash, consumerId, buffer, bufferId},
            [buffer.buffer] // Transfer the underlying `ArrayBuffer` back to main
        );
    }
}
self.addEventListener("message", ({data}) => {
    const action = data && data.type && actions[data.type];
    if (action) {
        action(data);
    }
});