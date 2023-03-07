class Example {
    static #cache = new WeakMap();

    constructor(thingy) {
        const cache = Example.#cache ;
        const previous = cache.get(thingy);
        if (previous) {
            return previous;
        }
        cache.set(thingy, this);
    }
}

const obj1 = {};
const e1 = new Example(obj1);
const e1again = new Example(obj1);
console.log(e1 === e1again);    // true, the same instance was returned
const obj2 = {};
const e2 = new Example(obj2);
console.log(e1 === e2);         // false, a new instance was created
