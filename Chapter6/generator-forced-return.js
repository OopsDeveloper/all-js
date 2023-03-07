function* example() {
    yield 1;
    yield 2;
    yield 3;
}
const gen = example();
console.log(gen.next());     // {value: 1, done: false}
console.log(gen.return(42)); // {value: 42, done: true}
console.log(gen.next());     // {value: undefined, done: true}
