function* example() {
    yield 1;
    yield 2;
    yield 3;
}
const gen = example();
console.log(gen.next());                   // {value: 1, done: false}
console.log(gen.throw(new Error("boom"))); // Uncaught Error: boom
console.log(gen.next());                   // (never executed)
