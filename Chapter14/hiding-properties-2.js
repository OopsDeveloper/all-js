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
    const functionProxies = new WeakMap();
    const p = new Proxy(new Counter(name), {
        get(target, name, receiver) {
            if (name === "_value") {
                return undefined;
            }
            let value = Reflect.get(target, name);
            if (typeof value === "function") {
                let funcProxy = functionProxies.get(value);
                if (!funcProxy) {
                    funcProxy = new Proxy(value, {
                        apply(funcTarget, thisValue, args) {
                            const t = thisValue === p ? target : thisValue;
                            return Reflect.apply(funcTarget, t, args);
                        }
                    });
                    functionProxies.set(value, funcProxy);
                    value = funcProxy;
                }
            }
            return value;
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
console.log("p.value after increment:");
console.log(p.value);                     // 1
console.log("p._value after increment:");
console.log(p._value);                    // undefined
console.log("'_value' in p:");
console.log('_value' in p);               // false
console.log("Object.keys(p):");
console.log(Object.keys(p));              // ["name"]
p._value = 42;                            // ignored (error in strict mode)
console.log("p.value after changing _value:");
console.log(p.value);                     // 1
