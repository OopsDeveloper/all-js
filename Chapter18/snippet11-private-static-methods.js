class Example {
    static #log(...msgs) {
        console.log(`${new Date().toISOString()}:`, ...msgs);
    }

    constructor(a) {
        Example.#log("Initializing instance, a =", a);
    }
}
const e = new Example("one");
// => "2018-12-20T14:03:12.302Z: Initializing instance, a = one"
