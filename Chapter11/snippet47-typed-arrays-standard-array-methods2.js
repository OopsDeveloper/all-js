const a1 = Uint8Array.of(50, 100, 150, 200);
const a2 = a1.map(v => v * 2);
console.log(a2);    // Uint8Array [ 100, 200, 44, 144 ]
