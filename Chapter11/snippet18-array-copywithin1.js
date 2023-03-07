const a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
console.log("before", a);
a.copyWithin(2, 8);
console.log("after ", a);
// =>
// before ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
// after  ["a", "b", "i", "j", "k", "f", "g", "h", "i", "j", "k"]