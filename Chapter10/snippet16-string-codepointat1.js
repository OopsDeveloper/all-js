// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

console.log("😊".codePointAt(0).toString(16).toUpperCase()); // 1F60A

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// console.log("\u{1F60A}".codePointAt(0).toString(16).toUpperCase()); // 1F60A
