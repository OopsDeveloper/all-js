// Adding it
const iteratorPrototype = Object.getPrototypeOf(
    Object.getPrototypeOf([][Symbol.iterator]())
);
Object.defineProperty(iteratorPrototype, "myFind", {
    value(callback, thisArg) {
        let result;
        while (!(result = this.next()).done) {
            if (callback.call(thisArg, result.value)) {
                break;
            }
        }
        return result;
    },
    writable: true,
    configurable: true
});

// Using it
const a = ["one", "two", "three", "four", "five", "six"];
const it = a[Symbol.iterator]();
let result;
while (!(result = it.myFind(v => v.includes("e"))).done) {
    console.log("Found: " + result.value);
}
console.log("Done");
