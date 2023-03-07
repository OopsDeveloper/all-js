const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);

for (const key of m.keys()) {
    console.log(key);
}
// one
// two
// three

for (const value of m.values()) {
    console.log(value);
}
// uno
// due
// tre
