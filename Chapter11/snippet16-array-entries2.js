const a = ["one", "two", "three"];
for (const [index, value] of a.entries()) {
    console.log(index, value);
}
// =>
// 0 "one"
// 1 "two"
// 2 "three"