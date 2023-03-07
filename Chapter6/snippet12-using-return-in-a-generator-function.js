function* usingReturn() {
    yield 1;
    yield 2;
    return 3;
}
console.log("Using for-of:");
for (const value of usingReturn()) {
    console.log(value);
}
// =>
// 1
// 2
console.log("Using the generator directly:");
const g = usingReturn();
let result;
while (!(result = g.next()).done) {
    console.log(result);
}
// =>
// {value: 1, done: false}
// {value: 2, done: false}
console.log(result);
// =>
// {value: 3, done: true}
