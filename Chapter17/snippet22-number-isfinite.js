const s = "42";
console.log(Number.isFinite(s));        // false: it's a string, not a number
console.log(isFinite(s));               // true: the global function coerces
console.log(Number.isFinite(42));       // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(1 / 0));    // false: in JavaScript x / 0 = Infinity
