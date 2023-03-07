const obj = {};
const p = new Proxy(obj, {
    defineProperty(target, propName, descriptor) {
        if ("writable" in descriptor && !descriptor.writable) {
            const currentDescriptor =
                Reflect.getOwnPropertyDescriptor(target, propName);
            if (currentDescriptor && currentDescriptor.writable) {
                return false;
            }
        }
        return Reflect.defineProperty(target, propName, descriptor);
    }
});
p.a = 1;
console.log(`p.a = ${p.a}`);
console.log("Trying to make p.a non-writable...");
console.log(
    `Result of defineProperty: ${Reflect.defineProperty(p, "a", {writable: false})}`
);
console.log("Setting pa.a to 2...");
p.a = 2;
console.log(`p.a = ${p.a}`);
