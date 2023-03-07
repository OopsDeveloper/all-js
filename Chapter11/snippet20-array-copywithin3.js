function arrayString(a) {
    return Array.from(a.keys(), key => {
        return key in a ? a[key] : "*gap*";
    }).join(", ");
}
const a = ["a", "b", "c", "d", , "f", "g"];
console.log("before", arrayString(a));
a.copyWithin(1, 3);
console.log("after ", arrayString(a));
// =>
// before a, b, c, d, *gap*, f, g
// after  a, d, *gap*, f, g, f, g
