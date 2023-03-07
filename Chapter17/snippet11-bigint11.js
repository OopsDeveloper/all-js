console.log(BigInt.asIntN(16, -20000n));
// => -20000n
console.log(BigInt.asUintN(16, 20000n));
// => 20000n
console.log(BigInt.asIntN(16, 100000n));
// => -31072n
console.log(BigInt.asUintN(16, 100000n));
// => 34464n
