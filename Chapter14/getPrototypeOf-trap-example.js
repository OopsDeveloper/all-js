const proto = {
    testing: "one two three"
};
const obj = Object.create(proto);
const p = new Proxy(obj, {
    getPrototypeOf(target) {
        return null;
    }
});
console.log(p.testing);                // one two three
console.log(Object.getPrototypeOf(p)); // null
