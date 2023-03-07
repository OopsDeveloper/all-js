// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

const rex = /\u{1F60A}/u;
const str = "Testing: 😊 ";
console.log(rex.test(str)); // true

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// const rex = /\u{1F60A}/u;
// const str = "Testing: \uD83D\uDE0A ";
// console.log(rex.test(str)); // true
