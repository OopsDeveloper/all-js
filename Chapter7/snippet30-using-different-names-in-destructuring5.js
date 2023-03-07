const source = {example: 42};
const dest = {};
({example: dest.result} = source);
console.log(dest.result);   // 42
