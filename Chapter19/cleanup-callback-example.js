let stop = false;
const registry = new FinalizationRegistry(heldValue => {
    console.log(`Object for '${heldValue}' has been reclaimed`);
    stop = true;
});
const firstSize = 100000000;
console.log(`main:    Allocating ${firstSize} bytes of data to hold weakly...`);
let data = new ArrayBuffer(firstSize);
registry.register(data, "data", data);
data = null; // Releases the reference
let moreData = [];
let counter = 0;
let size = 50000;

setTimeout(tick, 10);

function tick() {
    if (stop) {
        return;
    }
    ++counter;
    if (size < 100000000) {
        size *= 10;
    }
    console.log();
    console.log(`tick(${counter}): Allocating ${size} bytes more data...`);
    moreData.push(new ArrayBuffer(size));
    // This `if` is just a sanity check to avoid looping forever if the weakly held
    // data is never reclaimed or the host never calls the cleanup callback.
    if (counter < 100) {
        setTimeout(tick, 10);
    }
}
