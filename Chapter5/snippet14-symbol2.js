// Direct usage
const obj1 = {
    [Symbol.toStringTag]: "Nifty"
};
console.log(obj1.toString());   // "[object Nifty]"

// Via a prototype
const p = {
    [Symbol.toStringTag]: "Spiffy"
};
const obj2 = Object.create(p);
console.log(obj2.toString());   // "[object Spiffy]"
