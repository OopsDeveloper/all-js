function example({a, b}) {
    console.log(a, b);
}
const o = {a: "ayy", b: "bee", c: "see", d: "dee"};
example(o);             // "ayy" "bee"
example({a: 1, b: 2});  // 1 2
