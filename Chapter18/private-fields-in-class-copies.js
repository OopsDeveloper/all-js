function makeCounterClass() {
    return class Counter {
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

        static show(counter) {
            console.log(`counter.#value = ${counter.#value}`);
        }
    };
}

const Counter1 = makeCounterClass();
const Counter2 = makeCounterClass();

const c = new Counter1();
c.increment();
Counter1.show(c);   // "counter.#value = 1"
Counter2.show(c);   // TypeError: Cannot read private member #value from an
                    // object whose class did not declare it
