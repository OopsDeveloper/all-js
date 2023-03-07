function* simple() {
    for (let n = 1; n <= 3; ++n) {
        yield n;
    }
}
const g = simple();
let result;
while (!(result = g.next()).done) {
    console.log(result.value);
}
