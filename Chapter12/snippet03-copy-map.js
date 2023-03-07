const m1 = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"]
]);
const m2 = new Map(m1);
console.log(m2.get(2)); // two
