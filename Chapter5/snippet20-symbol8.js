// In the global registry:
const s = Symbol.for("my-nifty-symbol");
const key = Symbol.keyFor(s);
console.log(key);   // "my-nifty-symbol"

// Not in the global registry:
const s2 = Symbol("my-nifty-symbol");
const key2 = Symbol.keyFor(s2);
console.log(key2);  // undefined
