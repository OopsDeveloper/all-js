let shared;
let index;
const updateAndPing = () => {
    ++shared[index];
    index = (index + 1) % shared.length;
    this.postMessage({type: "ping"});
};
this.addEventListener("message", e => {
    if (e.data) {
        switch (e.data.type) {
            case "init":
                shared = e.data.sharedArray;
                index = 0;
                updateAndPing();
                break;
            case "pong":
                updateAndPing();
                break;
        }
    }
});
