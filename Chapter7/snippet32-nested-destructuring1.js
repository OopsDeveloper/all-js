const obj = {a: [1, 2, 3], b: [4, 5, 6]};
let {a: [first, second]} = obj;
console.log(first, second); // 1 2
