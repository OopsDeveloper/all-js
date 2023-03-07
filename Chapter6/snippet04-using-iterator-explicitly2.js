const a = ["a", "b", "c"];
const it = a[Symbol.iterator]();
let result;
while (!(result = it.next()).done) {
    console.log(result.value);
}
