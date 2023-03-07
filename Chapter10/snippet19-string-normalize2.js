// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

const f1 = "Français";
const f2 = "Franc\u0327ais";
console.log(f1 === f2); // false
