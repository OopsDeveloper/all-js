let a, b, c;
const obj = {a: 10, b: 20};
({c = a * 3, b, a} = obj);
console.log(c); // NaN
