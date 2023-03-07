class Counter {
    #value;

    constructor(start = 0) {
        this.#value = start;
    }

    increment() {
        return ++this.#value;
    }

    get value() {
        return this.#value;
    }
}
const c = new Counter();
console.log(c.value); // 0
c.increment();
console.log(c.value); // 1
// console.log(c.#value); // Would be a SyntaxError
