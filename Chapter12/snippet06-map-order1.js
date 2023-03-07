const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);

// Modify existing entry
m.set("two", "due (updated)");
for (const [key, value] of m) {
    console.log(`${key} => ${value}`);
}
// one => uno
// two => due (updated)
// three => tre

// Remove entry, then add a new one with the same key
m.delete("one");
m.set("one", "uno (new)");
for (const [key, value] of m) {
    console.log(`${key} => ${value}`);
}
// two => due (updated)
// three => tre
// one => uno (new)
