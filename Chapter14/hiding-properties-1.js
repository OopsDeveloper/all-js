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

function getCounter(name) {
    const p = new Proxy(new Counter(name), {
        get(target, name, receiver) {
            if (name === "_value") {
                return undefined;
            }
            return Reflect.get(target, name, receiver);
        },
        getOwnPropertyDescriptor(target, propName) {
            if (name === "_value") {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(target, propName);
        },
        defineProperty(target, name, descriptor) {
            if (name === "_value") {
                return false;
            }
            return Reflect.defineProperty(target, name, descriptor);
        },
        has(target, name) {
            if (name === "_value") {
                return false;
            }
            return Reflect.has(target, name);
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => key !== "_value");
        }
    });
    return p;
}

const p = getCounter("p");
console.log("p.value before increment:");
console.log(p.value);                     // 0
console.log("p._value before increment:");
console.log(p._value);                    // undefined
p.increment();
// ^^ error thrown here:
// TypeError: 'set' on proxy: trap returned falsish for property '_value'
console.log("p.value after increment:");
console.log(p.value);
console.log("p._value after increment:");
console.log(p._value);
console.log("'_value' in p:");
console.log('_value' in p);
console.log("Object.keys(p):");
console.log(Object.keys(p));
p._value = 42;
console.log("p.value after changing _value:");
console.log(p.value);
