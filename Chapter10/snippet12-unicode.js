// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

console.log("a".length); // 1
console.log("नि".length); // 2
console.log("😊".length); // 2

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// console.log("a".length);                 // 1
// console.log("\u{928}\u{93F}".length);    // 2
// console.log("\u{1F60A}".length);         // 2
