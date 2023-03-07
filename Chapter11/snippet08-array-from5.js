const str = "987654321";
const a = Array.from(str, digit => parseInt(digit, 10));
console.log(a); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
