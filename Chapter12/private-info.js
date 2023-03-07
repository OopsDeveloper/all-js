const Example = (() => {
    const privateMap = new WeakMap();

    return class Example {
        constructor() {
            privateMap.set(this, 0);
        }

        incrementCounter() {
            const result = privateMap.get(this) + 1;
            privateMap.set(this, result);
            return result;
        }

        showCounter() {
            console.log(`Counter is ${privateMap.get(this)}`);
        }
    };
})();

const e1 = new Example();
e1.incrementCounter();
console.log(e1);         // (some representation of the object)

const e2 = new Example();
e2.incrementCounter();
e2.incrementCounter();
e2.incrementCounter();

e1.showCounter();        // Counter is 1
e2.showCounter();        // Counter is 3
