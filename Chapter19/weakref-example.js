const firstSize = 100000000;
console.log(`main:    Allocating ${firstSize} bytes of data to hold weakly...`);
let data = new ArrayBuffer(firstSize);
let ref = new WeakRef(data);
data = null; // Releases the strong reference, leaving us with only the weak ref
let moreData = [];
let counter = 0;
let size = 50000;

setTimeout(tick, 10);

function tick() {
    ++counter;
    if (size < 100000000) {
        size *= 10;
    }
    console.log();
    console.log(`tick(${counter}): Allocating ${size} bytes more data...`);
    moreData.push(new ArrayBuffer(size));
    console.log(`tick(${counter}): Getting the weakly held data...`);
    const data = ref.deref();
    if (data) {
        console.log(`tick(${counter}): weakly held data still in memory.`);
        // This `if` is just a sanity check to avoid looping forever if the weakly
        // held data is never reclaimed.
        if (counter < 100) {
            setTimeout(tick, 10);
        } else {
            console.log(`tick(${counter}): Giving up`);
        }
    } else {
        console.log(`tick(${counter}): weakly held data was garbage collected.`);
    }
}
