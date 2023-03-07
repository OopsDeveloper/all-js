const a = ["a", "b", "c"];
const it = a[Symbol.iterator]();    // Step 1
let result = it.next();             // Step 2
while (!result.done) {              // Step 3.a
    console.log(result.value);      // Step 3.b
    result = it.next();             // Step 3.c
}
