const obj = {
    testing: "abc"
};
const p = new Proxy(obj, {
    get(target, name, receiver) {
        console.log(`(getting property '${name}')`);
        return Reflect.get(target, name, receiver);
    }
});

console.log("Getting 'testing' directly...");
console.log(`Got ${obj.testing}`);
console.log("Getting 'testing' via proxy...");
console.log(`Got ${p.testing}`);
console.log("Getting non-existent property 'foo' via proxy...");
console.log(`Got ${p.foo}`);
