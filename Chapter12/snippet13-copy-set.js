const s1 = new Set(["a", "b", "c"]);
const s2 = new Set(s1);
console.log(s2.has("b"));   // true
s1.delete("b");
console.log(s2.has("b"));   // true (still, removing from s1 doesn't remove from s2)
