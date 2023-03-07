const s = Symbol("example");
const o1 = {
    // A property named with a Symbol
    [s]: "one",
    // An accessor property
    get example() {
        return this[s];
    },
    set example(value) {
        this[s] = value;
    },
    // A data property
    data: "value"
};
// A non-enumerable property
Object.defineProperty(o1, "nonEnum", {
    value: 42,
    writable: true,
    configurable: true
});

// Copy those properties to a new object
const descriptors = Object.getOwnPropertyDescriptors(o1);
const o2 = Object.defineProperties({}, descriptors);
console.log(o2.example);    // "one"
o2.example = "updated";
console.log(o2[s]);         // "updated", the accessor property wrote to the [s] prop
console.log(o2.nonEnum);    // 42
console.log(o2.data);       // "value"

// Contrast with `Object.assign`:
console.log("----");
const o3 = Object.assign({}, o1);
console.log(o3.example);    // "one"
o3.example = "updated";
console.log(o3[s]);         // "one", because `example` is just a data property, not an accessor
console.log(o3.nonEnum);    // undefined
console.log(o3.data);       // "value"
