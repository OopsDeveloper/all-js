const a1 = Uint8Array.from([1, 2, 3]);
const a2 = Uint8Array.from([4, 5, 6]);
const a3 = Uint8Array.from([7, 8, 9]);
const all = Uint8Array.of(...a1, ...a2, ...a3);
console.log(all);   // Uint8Array [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
