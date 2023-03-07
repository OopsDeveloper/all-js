const everUpward = (() => {
    const count = Symbol("count");
    return {
        [count]: 0,
        increment() {
            return ++this[count];
        },
        get() {
            return this[count];
        }
    };
})();
console.log(everUpward.get());              // 0
everUpward.increment();
console.log(everUpward.get());              // 1
console.log(everUpward["count"]);           // undefined
console.log(everUpward[Symbol("count")]);   // undefined
