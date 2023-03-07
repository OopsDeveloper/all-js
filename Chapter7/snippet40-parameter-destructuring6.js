function example({a, b = 2}) {
    console.log(a, b);
}
const o = {a: 1};
example(o); // 1 2
