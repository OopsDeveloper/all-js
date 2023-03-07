// Loose mode only, since it uses `with`
const obj = {
    a: 1,
    b: 2
};
with (obj) {
    console.log(a, b, typeof toString); // 1 2 "function"
}
