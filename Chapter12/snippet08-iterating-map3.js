const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
]);
m.forEach((value, key) => {
    console.log(`${key} => ${value}`);
});
// one => uno
// two => due
// three => tre
