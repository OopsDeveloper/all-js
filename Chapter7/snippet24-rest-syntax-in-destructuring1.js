const a = [1, 2, 3, 4, 5];
const [first, second, ...rest] = a;
console.log(first);     // 1
console.log(second);    // 2
console.log(rest);      // [3, 4, 5]
