class MyMap extends Map {
    filter(predicate, thisArg) {
        const newMap = new (this.constructor[Symbol.species] || MyMap)();
        for (const [key, value] of this) {
            if (predicate.call(thisArg, key, value, this)) {
                newMap.set(key, value);
            }
        }
        return newMap;
    }
}

// Usage:
const m1 = new MyMap([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);
const m2 = m1.filter(key => key.includes("t"));
for (const [key, value] of m2) {
    console.log(`${key} => ${value}`);
}
// two => due
// three => tre
console.log(`m2 instanceof MyMap? ${m2 instanceof MyMap}`);
// m2 instanceof MyMap? true