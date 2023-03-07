// See Chapter 14's "Example: Logging Proxy" for an explanation of the
// `names` map and why `log` uses it.
const names = new WeakMap();
function log(label, params) {
    console.log(label + ": " + Object.getOwnPropertyNames(params).map(key => {
        const value = params[key];
        const name = names.get(value);
        const display = name ? name : JSON.stringify(value);
        return `${key} = ${display}`;
    }).join(", "));
}

const handlers = {
    apply(target, thisValue, args) {
        log("apply", {target, thisValue, args});
        return Reflect.apply(target, thisValue, args);
    },
    construct(target, args, newTarget) {
        log("construct", {target, args, newTarget});
        return Reflect.construct(target, args, newTarget);
    },
    defineProperty(target, propName, descriptor) {
        log("defineProperty", {target, propName, descriptor});
        return Reflect.defineProperty(target, propName, descriptor);
    },
    deleteProperty(target, propName) {
        log("deleteProperty", {target, propName});
        return Reflect.deleteProperty(target, propName);
    },
    get(target, propName, receiver) {
        log("get", {target, propName, receiver});
        return Reflect.get(target, propName, receiver);
    },
    getOwnPropertyDescriptor(target, propName) {
        log("getOwnPropertyDescriptor", {target, propName});
        return Reflect.getOwnPropertyDescriptor(target, propName);
    },
    getPrototypeOf(target) {
        log("getPrototypeOf", {target});
        return Reflect.getPrototypeOf(target);
    },
    has(target, propName) {
        log("has", {target, propName});
        return Reflect.has(target, propName);
    },
    isExtensible(target) {
        log("isExtensible", {target});
        return Reflect.isExtensible(target);
    },
    ownKeys(target) {
        log("ownKeys", {target});
        return Reflect.ownKeys(target);
    },
    preventExtensions(target) {
        log("preventExtensions", {target});
        return Reflect.preventExtensions(target);
    },
    set(target, propName, value, receiver) {
        log("set", {target, propName, value, receiver});
        return Reflect.set(target, propName, value, receiver);
    },
    setPrototypeOf(target, newProto) {
        log("setPrototypeOf", {target, newProto});
        return Reflect.setPrototypeOf(target, newProto);
    }
};

class Counter {
    constructor(name) {
        this.value = 0;
        this.name = name;
    }
    increment() {
        return ++this.value;
    }
}

const c = new Counter("counter");
const cProxy = new Proxy(c, handlers);
names.set(c, "c");
names.set(cProxy, "cProxy");

console.log("---- Getting cProxy.value (before increment):");
console.log(`cProxy.value (before) = ${cProxy.value}`);
console.log("---- Calling cProxy.increment():");
cProxy.increment();
console.log("---- Getting cProxy.value (after increment):");
console.log(`cProxy.value (after) = ${cProxy.value}`);
console.log("---- Getting cProxy's own enumerable string-named keys:");
console.log(Object.keys(cProxy));
console.log("---- Deleting cProxy.value:");
delete cProxy.value;
console.log("---- Checking whether cProxy has a 'value' property:");
console.log(`"value" in cProxy? ${"value" in cProxy}`);
console.log("---- Getting the prototype of cProxy:");
const sameProto = Object.getPrototypeOf(cProxy) === Counter.prototype;
console.log(`Object.getPrototypeOf(cProxy) === Counter.prototype? ${sameProto}`);
console.log("---- Setting the prototype of cProxy to Object.prototype:");
Object.setPrototypeOf(cProxy, Object.prototype);
console.log("---- Getting the prototype of cProxy again:");
const sameProto2 = Object.getPrototypeOf(cProxy) === Counter.prototype;
console.log(`Object.getPrototypeOf(cProxy) === Counter.prototype? ${sameProto2}`);
console.log("---- Is cProxy extensible?:");
console.log(`Object.isExtensible(cProxy) (before)? ${Object.isExtensible(cProxy)}`);
console.log("---- Preventing extensions on cProxy:");
Object.preventExtensions(cProxy);
console.log("---- Is cProxy still extensible?:");
console.log(`Object.isExtensible(cProxy) (after)? ${Object.isExtensible(cProxy)}`);

const func = function() { console.log("func ran"); };
const funcProxy = new Proxy(func, handlers);
names.set(func, "func");
names.set(funcProxy, "funcProxy");

console.log("---- Calling funcProxy as a function:");
funcProxy();
console.log("---- Calling funcProxy as a constructor:");
new funcProxy();

const arrowFunc = () => { console.log("arrowFunc ran"); };
const arrowFuncProxy = new Proxy(arrowFunc, handlers);
names.set(arrowFunc, "arrowFunc");
names.set(arrowFuncProxy, "arrowFuncProxy");

console.log("---- Calling arrowFuncProxy as a function:");
arrowFuncProxy();
console.log("---- Calling arrowFuncProxy as a constructor:");
try {
    new arrowFuncProxy();
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

console.log("---- Getting name of arrowFuncProxy:");
console.log(`arrowFuncProxy.name = ${arrowFuncProxy.name}`);
