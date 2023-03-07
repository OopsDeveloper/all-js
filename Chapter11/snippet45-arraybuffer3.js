const buf = new ArrayBuffer(18);
const a = new Int32Array(buf);  // RangeError: byte length of Int32Array
                                // should be a multiple of 4
