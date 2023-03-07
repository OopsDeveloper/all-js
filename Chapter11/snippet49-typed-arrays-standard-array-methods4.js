class ByteArray extends Uint8Array {
    static get [Symbol.species]() {
        return Array;
    }
    map(fn, thisArg) {
        const ctor = this.constructor[Symbol.species];
        return ctor.from(this).map(fn, thisArg);
    }
    // ...and similar for `filter`, `slice`, and `subarray`
}
const a = ByteArray.of(3, 2, 1);
console.log(a.map(v => v * 2)); // [ 6, 4, 2 ]
