class Example {
    #cappedValue;
    constructor(value) {
        // Saving the value via the accessor's setter
        this.#value = value;
    }

    get #value() {
        return this.#cappedValue;
    }

    set #value(value) {
        this.#cappedValue = value.toUpperCase();
    }

    show() {
        console.log(`this.#value = ${this.#value}`);
    }

    update(value) {
        this.#value = value;
    }
}

const ex = new Example("a");
ex.show();  // "this.#value = A"
ex.update("b")
ex.show();  // "this.#value = B"
// ex.#value = "c"; // Would be a SyntaxError, `#value` is private
