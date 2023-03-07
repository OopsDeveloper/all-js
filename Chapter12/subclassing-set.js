class MySet extends Set {
    addAll(iterable) {
        for (const value of iterable) {
            this.add(value);
        }
        return this;
    }
}

// Usage
const s = new MySet();
s.addAll(["a", "b", "c"]);
s.addAll([1, 2, 3]);
for (const value of s) {
    console.log(value);
}
// a
// b
// c
// 1
// 2
// 3