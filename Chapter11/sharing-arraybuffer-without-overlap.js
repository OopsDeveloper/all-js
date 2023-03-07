const buf = new ArrayBuffer(20);
const bytes = new Uint8Array(buf, 0, 8);
const words = new Uint16Array(buf, 8);
console.log(buf.byteLength); // 20 (20 bytes)
console.log(bytes.length);   // 8 (8 bytes)
console.log(words.length);   // 6 (6 two-byte [16-bit] words = 12 bytes)
