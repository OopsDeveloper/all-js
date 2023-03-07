// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

// These are code UNIT escapes; the next snippet has code POINT escapes
const rex = /\uD83D\uDE0A/;
const str = "Testing: 😊 ";
console.log(rex.test(str)); // true

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// const rex = /\uD83D\uDE0A/;
// const str = "Testing: \u{1F60A} ";
// console.log(rex.test(str)); // true
