const obj = {foo: 42};
const p = new Proxy(obj, {
    setPrototypeOf(target, newProto) {
        // Return false unless `newProto` is already `target`'s prototype
        return Reflect.getPrototypeOf(target) === newProto;
    }
});
console.log(Reflect.getPrototypeOf(p) === Object.prototype); // true
console.log(Reflect.setPrototypeOf(p, Object.prototype));    // true
console.log(Reflect.setPrototypeOf(p, Array.prototype));     // false
