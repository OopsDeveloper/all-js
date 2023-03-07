function* example() {
    yield 1;
    yield 2;
    return 3;
}
const gen = example();
console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next()); // {value: 2, done: false}
console.log(gen.next()); // {value: 3, done: true}