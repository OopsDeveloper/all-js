function* foo(n) {
    try {
        while (true) {
            n = yield n * 2;
        }
    } finally {
        return "override";  // (Generally poor practice)
    }
}
const gen = foo(2);
console.log(gen.next());    // { value: 4, done: false }
console.log(gen.next(3));   // { value: 6, done: false }
console.log(gen.return(4)); // { value: "override", done: true }
