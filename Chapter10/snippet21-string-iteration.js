// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

const charToHex = ch =>
    "0x" + ch.codePointAt(0).toString(16).toUpperCase().padStart(6, "0");
const show = array => {
    console.log(array.map(charToHex));
};

const str = ">😊<";
show(str.split(""));    // ["0x00003E", "0x00D83D", "0x00DE0A", "0x00003C"]
show(Array.from(str));  // ["0x00003E", "0x01F60A", "0x00003C"]

// If the above didn't produce the output shown above, it's likely an encoding problem. This version
// should work:
// const charToHex = ch =>
//     "0x" + ch.codePointAt(0).toString(16).toUpperCase().padStart(6, "0");
// const show = array => {
//     console.log(array.map(charToHex));
// };
// 
// const str = ">\u{1F60A}<";
// show(str.split(""));    // ["0x00003E", "0x00D83D", "0x00DE0A", "0x00003C"]
// show(Array.from(str));  // ["0x00003E", "0x01F60A", "0x00003C"]
