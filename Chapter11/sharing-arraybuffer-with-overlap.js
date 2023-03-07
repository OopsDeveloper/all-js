const buf = new ArrayBuffer(12);
const bytes = new Uint8Array(buf);
const words = new Uint16Array(buf);
console.log(words[0]); // 0
bytes[0] = 1;
bytes[1] = 1;
console.log(bytes[0]); // 1
console.log(bytes[1]); // 1
console.log(words[0]); // 257
