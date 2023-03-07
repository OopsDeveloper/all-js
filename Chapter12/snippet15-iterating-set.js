const s = new Set(["a", "b", "c"]);
for (const value of s) { // or `of s.values()`
    console.log(value);
}
// a
// b
// c

for (const key of s.keys()) {
    console.log(key);
}
// a
// b
// c

for (const [key, value] of s.entries()) {
    console.log(`${key} => ${value}`);
}
// a => a
// b => b
// c => c
