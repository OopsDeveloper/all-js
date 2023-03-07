let stop = false;
// The old name for `FinalizationRegistry` was `FinalizationGroup`
const ctor = typeof FinalizationRegistry === "undefined"
    ? FinalizationGroup
    : FinalizationRegistry;
const registry = new ctor(arg => {
    // With the old semantics, the callback was called with an iterator
    // for a list of held values, rather than called repeatedly with
    // individual held values.
    if (typeof arg === "string") {
        // Newer semantics: a single held value per call
        console.log(`Object for '${arg}' has been reclaimed`);
    } else {
        // Older semantics: an iterator for a list of held values
        for (const heldValue of arg) {
            console.log(`Object for '${heldValue}' has been reclaimed`);
        }
    }
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
    registry.cleanupSome()
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
