function* inner() {
    try {
        yield "something";
    } finally {
        return "override";      // (Generally poor practice)
    }
}
function* outer() {
    yield* inner();
}
const gen = outer();
let result = gen.next();
console.log(gen.return(42));    // {value: "override", done: true}
