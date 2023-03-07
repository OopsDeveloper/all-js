const original = [1, 2, 3, 4];
const flattened = original.flatMap(e => e === 3 ? ["3a", "3b", "3c"] : e);
console.log(flattened);
// => [1, 2, "3a", "3b", "3c", 4]
