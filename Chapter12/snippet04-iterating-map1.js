const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);
for (const [key, value] of m) {
    console.log(`${key} => ${value}`);
}
// one => uno
// two => due
// three => tre
