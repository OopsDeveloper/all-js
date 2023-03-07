const a = ["a", "b", "c"];
a.extra = "extra property";
for (const value of a) {
    console.log(value);
}
// The above produces "a", "b", and "c"
for (const key in a) {
    console.log(key);
}
// The above produces "0", "1", "2", and "extra"
