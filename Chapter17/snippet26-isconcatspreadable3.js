const a = ["one", "two"];
const obj = {
    0: "four",
    1: "five",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
console.log(a.concat("three", obj));
// => ["one", "two", "three", "four", "five" ]
