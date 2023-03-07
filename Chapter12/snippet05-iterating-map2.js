const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);
for (const entry of m) {
    console.log(`${entry[0]} => ${entry[1]}`);
}
// one => uno
// two => due
// three => tre
