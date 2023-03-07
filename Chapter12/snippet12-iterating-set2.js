const s = new Set(["one", "two", "three"]);
for (const value of s) {
    console.log(value);
}

s.add("one"); // Again
for (const value of s) {
    console.log(value);
}
// one
// two
// three

s.delete("one");
s.add("one");
for (const value of s) {
    console.log(value);
}
// two
// three
// one
