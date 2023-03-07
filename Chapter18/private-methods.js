class Example {
    #value;
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#calculate();
    }

    #calculate() {
        // Imagine an expensive operation here...
        this.#value = this.#x * this.#y;
    }

    get x() {
        return this.#x;
    }

    set x(x) {
        this.#x = x;
        this.#calculate();
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;
        this.#calculate();
    }

    get value() {
        return this.#value;
    }
}

const ex = new Example(21, 2);
console.log(`ex.value = ${ex.value}`); // 42
// This would be a syntax error:
//ex.#calculate();
