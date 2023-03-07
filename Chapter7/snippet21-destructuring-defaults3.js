const obj = {a: 10, b: 20};
const {a, b, c = a * 3} = obj;
console.log(c); // 30
