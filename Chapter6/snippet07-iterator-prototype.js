const a = ["one", "two", "three", "four"];
const it = a[Symbol.iterator]();
it.next();
for (const value of it) {
    console.log(value);
}
// =>
// "two"
// "three"
// "four"
