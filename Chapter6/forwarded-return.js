function* inner() {
    try {
        let n = 0;
        while (true) {
            yield "inner " + n++;
        }
    } finally {
        console.log("inner terminated");
    }
}
function* outer() {
    try {
        yield "outer before";
        yield* inner();
        yield "outer after";
    } finally {
        console.log("outer terminated");
    }
}

const gen = outer();
let result = gen.next();
console.log(result);     // {value: "outer before", done: false}
result = gen.next();
console.log(result);     // {value: "inner 0", done: false}
result = gen.next();
console.log(result);     // {value: "inner 1", done: false}
result = gen.return(42); // "inner terminated"
                         // "outer terminated"
console.log(result);     // {value: 42, done: true}
result = gen.next();
console.log(result);     // {value: undefined, done: true}
