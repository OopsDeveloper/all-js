function example(first, {a, b}, last) {
    console.log(first, a, b, last);
}
const o = {a: "ayy", b: "bee", c: "see", d: "dee"};
example("alpha", o, "omega");               // "alpha" "ayy" "bee" "omega"
example("primero", {a: 1, b: 2}, "ultimo"); // "primero" 1 2 "ultimo"
