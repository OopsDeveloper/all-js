// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

const charToHex = (str, i) =>
    "0x" + str.codePointAt(i).toString(16).toUpperCase().padStart(6, "0");
const str = "😊😊"; // Two identical smiling face emojis
for (let i = 0; i < str.length; ++i) {
    console.log(charToHex(str, i));
}
// =>
// 0x01F60A
// 0x00DE0A
// 0x01F60A
// 0x00DE0A

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// const charToHex = (str, i) =>
//     "0x" + str.codePointAt(i).toString(16).toUpperCase().padStart(6, "0");
// const str = "\u{1F60A}\u{1F60A}";   // Two identical smiling face emojis
// for (let i = 0; i < str.length; ++i) {
//     console.log(charToHex(str, i));
// }
