const a = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
    // The next example shows a simpler way to write the next line
    [Symbol.iterator]: function*() {
        for (let index = 0; index < this.length; ++index) {
            yield this[index];
        }
    }
};
for (const value of a) {
    console.log(value);
}
