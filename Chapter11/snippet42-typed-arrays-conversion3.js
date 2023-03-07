const value = -25;
const max = 256;
const negative = value < 0;
const remainder = Math.abs(value) % max;
const result = negative ? max - remainder : remainder;
console.log(result);    // 231
