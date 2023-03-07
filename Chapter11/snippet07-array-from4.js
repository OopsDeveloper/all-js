const str = "987654321";
const a = Array.from(str, parseInt); // <=== WRONG
console.log(a); // [9, NaN, NaN, NaN, NaN, 4, 3, 2, 1]
