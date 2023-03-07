class Counter {
    constructor(name) {
        this._value = 0;
        this.name = name;
    }
    increment() {
        return ++this._value;
    }
    get value() {
        return this._value;
    }
}

const c = new Counter("c");
console.log("c.value before increment:");
console.log(c.value);                     // 0
console.log("c._value before increment:");
console.log(c._value);                    // 0
c.increment();
console.log("c.value after increment:");
console.log(c.value);                     // 1
console.log("c._value after increment:");
console.log(c._value);                    // 1
console.log("'_value' in c:");
console.log('_value' in c);               // true
console.log("Object.keys(c):");
console.log(Object.keys(c));              // ["name", "_value"]
c._value = 42;
console.log("c.value after changing _value:");
console.log(c.value);                     // 42
