const a = ["one", "two"];
const obj = {
    0: "four",
    1: "five",
    length: 2
};
console.log(a.concat("three", obj));
// => ["one", "two", "three", {"0": "four", "1": "five", length: 2} ]
