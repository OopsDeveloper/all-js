const a = ["a", "b", "c", "d"];
const it = a[Symbol.iterator]();
let result;
while (!(result = it.next()).done) {
    if (result.value === "c") {
        if (it.return) {
            it.return();
        }
        break;
    }
    console.log(result.value); // This line isn't in the chapter, but it's useful for seeing what's going on
}
