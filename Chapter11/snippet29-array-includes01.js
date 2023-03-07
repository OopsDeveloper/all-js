const a = ["one", "two", "three"];
console.log(a.includes("two"));     // true
console.log(a.includes("four"));    // false
console.log(a.includes("one", 2));  // false, "one" is before index 2
