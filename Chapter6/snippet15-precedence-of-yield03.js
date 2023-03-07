function* example() {
    let a = (yield) + 2 + 30;
    return a;
}
const gen = example();
console.log(gen.next());    // {value: undefined, done: false}
console.log(gen.next(10));  // {value: 42, done: true}
