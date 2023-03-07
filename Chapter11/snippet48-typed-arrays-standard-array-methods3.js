class ByteArray extends Uint8Array {
    static get [Symbol.species]() {
        return Array;
    }
}
const a = ByteArray.of(3, 2, 1);
console.log(a.map(v => v * 2));
// => TypeError: Method %TypedArray%.prototype.map called on
// incompatible receiver [object Array]
