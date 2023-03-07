function* example() {
    let a = yield + 2 + 30; // WRONG
    return a;
}
const gen = example();
console.log(gen.next());    // {value: 32, done: false}
console.log(gen.next(10));  // {value: 10, done: true}
