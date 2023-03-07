const a = {
    0: "a",
    1: "b",
    2: "c",
    length: 3
};

// Take 1
a[Symbol.iterator] = function() {
    let index = 0;
    return {
        next: () => {
            if (index < this.length) {
                return {value: this[index++], done: false};
            }
            return {value: undefined, done: true};
        }
    };
};

for (const value of a) {
    console.log(value);
}
