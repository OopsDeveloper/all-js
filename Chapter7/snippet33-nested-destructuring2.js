const arr = {first: {a: 1, b: 2}, second: {a: 3, b: 4}};
const {first: {a}, second: {b}} = arr;
console.log(a, b);  // 1 4
