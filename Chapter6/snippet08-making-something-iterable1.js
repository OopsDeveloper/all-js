const a = {
    0: "a",
    1: "b",
    2: "c",
    length: 3
};
for (const value of a) { // TypeError: a is not iterable
    console.log(value);
}
