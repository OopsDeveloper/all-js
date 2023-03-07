const s = "foo";
console.log(Number.isNaN(s));   // false: it's a string, not a number
console.log(isNaN(s));          // true: the global function coerces
const n1 = 42;
console.log(Number.isNaN(n1));  // false
console.log(isNaN(n1));         // false
const n2 = NaN;
console.log(Number.isNaN(n2));  // true
console.log(isNaN(n2));         // true
