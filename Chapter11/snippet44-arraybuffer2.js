const buf = new ArrayBuffer(20);
const a = new Int32Array(buf);
console.log(buf.byteLength);    // 20 (bytes)
console.log(a.length);          // 5 (entries, each taking four bytes)
