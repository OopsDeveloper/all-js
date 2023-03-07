const a = ["a", "b", "c", "d", "e", "f", "g"];
console.log("before", a);
a.copyWithin(4, 2);
console.log("after ", a);
// =>
// before ["a", "b", "c", "d", "e", "f", "g"]
// after  ["a", "b", "c", "d", "c", "d", "e"]
