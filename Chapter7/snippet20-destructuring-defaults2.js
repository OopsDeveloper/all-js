const obj = {first: 1, second: 2, third: 0};
const {third = 3} = obj;
console.log(third); // 0, not 3
