const some = {
    deeply: {
        nested: {
            value: 42,
            func() {
                return "example";
            }
        },
        nullAtEnd: null
    },
    nullish1: null,
    nullish2: undefined
};

console.log(some?.deeply?.nested?.value);    // 42
console.log(some?.missing?.value);           // undefined, not an error
console.log(some?.nullish1?.value);          // undefined, not an error, not null
console.log(some?.nullish2?.value);          // undefined, not an error
let k = "nested";
console.log(some?.deeply?.[k]?.value);       // 42
k = "nullish1";
console.log(some?.deeply?.[k]?.value);       // undefined, not an error, not null
k = "nullish2";
console.log(some?.deeply?.[k]?.value);       // undefined, not an error
k = "oops";
console.log(some?.deeply?.[k]?.value);       // undefined, not an error
console.log(some?.deeply?.nested?.func?.()); // "example"
console.log(some?.missing?.stuff?.func?.()); // undefined, not an error
console.log(some?.deeply?.nullAtEnd?.());    // undefined, not an error
console.log(some?.nullish1?.func?.());       // undefined, not an error
k = "nullish2";
console.log(some?.[k]?.func?.());            // undefined, not an error
