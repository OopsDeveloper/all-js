// Using `of`:
const a2 = Int8Array.of(1, 2, "3");
console.log(a2);    // Int8Array(3): [1, 2, 3] -- "3" was converted to 3
// Using `from` with an array-like object:
const a3 = Int8Array.from({length: 3, 0: 1, 1: "2"});
console.log(a3);    // Int8Array(3): [1, 2, 0] -- undefined was converted to 0
// Using `from` with an array:
const a4 = Int8Array.from([1, 2, 3]);
console.log(a4);    // Int8Array(3): [1, 2, 3]
