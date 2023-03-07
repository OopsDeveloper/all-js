const obj = {
    testing: "abc"
};
const p = new Proxy(obj, {
    get(target, name, receiver) {
        console.log(`(getting property '${name}')`);
        let value = Reflect.get(target, name, receiver);
        if (value && typeof value.toUpperCase === "function") {
            value = value.toUpperCase();
        }
        return value;
    }
});

console.log("Getting directly...");
console.log(`Got ${obj.testing}`);
console.log("Getting via proxy...");
console.log(`Got ${p.testing}`);
