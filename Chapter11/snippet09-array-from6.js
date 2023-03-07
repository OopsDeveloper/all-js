const a = Array.from({length: 100}, (_, index) => index);
// Or: const a = Array.from(Array(100), (_, index) => index);
console.log(a); // [0, 1, 2, 3, ... 99]
