const num1 = 16;
const num2 = 50;
const a = [27, 14, 12, 64];
// `Math.min` doesn't care about the order:
console.log(Math.min(num1, num2, ...a)); // Math.min(16, 50, 27, 14, 12, 64) == 12
console.log(Math.min(num1, ...a, num2)); // Math.min(16, 27, 14, 12, 64, 50) == 12
console.log(Math.min(...a, num1, num2)); // Math.min(27, 14, 12, 64, 16, 50) == 12
// But `Array.prototype.push` would:
const a2 = [];
a2.push(num1, num2, ...a);
console.log(a2);            // [16, 50, 27, 14, 12, 64]
const a3 = [];
a3.push(num1, ...a, num2);
console.log(a3);            // [16, 27, 14, 12, 64, 50]
const a4 = [];
a4.push(...a, num1, num2);  
console.log(a4);            // [27, 14, 12, 64, 16, 50]
