// This is the `postMessage`+transferables version of example-producer.js

import {log, setLogging} from "./example-misc.js";

// The ID this producer uses when calling `log`, set by `actions.init`
let logId = "producer";

// Handle messages, take appropriate action
const actions = {
    // Initialize the producer from data in the message
    init(data) {
        const {fullspeed} = data;
        setLogging(!fullspeed);
        log(logId, "Running");
    },
    // Fill a buffer
    fill(data) {
        const {buffer, bufferId} = data;
        log(logId, `Filling buffer ${bufferId}`);
        for (let n = 0; n < buffer.length; ++n) {
            buffer[n] = Math.floor(Math.random() * 256);
        }
        self.postMessage(
            {type: "buffer", buffer, bufferId},
            [buffer.buffer] // Transfer the underlying `ArrayBuffer` back to main
        );
    }
}
self.addEventListener("message", ({ data }) => {
    const action = data && data.type && actions[data.type];
    if (action) {
        action(data);
    }
});