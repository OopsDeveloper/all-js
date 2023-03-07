const a1 = [1, 2, 3, 4, 1, 2, 3, 4];
const a2 = Array.from(new Set(a1));
console.log(a2.length);     // 4
console.log(a2.join(", ")); // 1, 2, 3, 4
