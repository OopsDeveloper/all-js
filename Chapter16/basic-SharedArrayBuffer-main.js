const sharedBuf = new SharedArrayBuffer(5 * Uint16Array.BYTES_PER_ELEMENT);
const sharedArray = new Uint16Array(sharedBuf);
const worker = new Worker("./basic-SharedArrayBuffer-worker.js");
let counter = 0;
console.log("initial: " + formatArray(sharedArray));
worker.addEventListener("message", e => {
    if (e.data && e.data.type === "ping") {
        console.log("updated: " + formatArray(sharedArray));
        if (++counter < 10) {
            worker.postMessage({type: "pong"});
        } else {
            console.log("done");
        }
    }
});
worker.postMessage({type: "init", sharedArray});

function formatArray(array) {
    return Array.from(
        array,
        b => b.toString(16).toUpperCase().padStart(4, "0")
    ).join(" ");
}
