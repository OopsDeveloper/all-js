function FakeDate() { }
Object.defineProperty(FakeDate, Symbol.hasInstance, {
    value(value) { return value instanceof Date; }
});
console.log(new Date() instanceof FakeDate); // true
