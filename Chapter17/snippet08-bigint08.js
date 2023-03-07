// Note: This version of `toNumber` differs slightly from Chapter 17's version, it's
// probably better to use TypeError and RangeError than to just use Error, and if
// requiring a BigInt, best to be proactive with that check.
function toNumber(b) {
    if (typeof b !== "bigint") {
        throw new TypeError("toNumber expects a BigInt");
        // (or return NaN, depending on your needs)
    }
    const n = Number(b);
    if (BigInt(n) !== b) {
        throw new RangeError(
            `Can't convert BigInt ${b}n to Number, loss of precision`
        );
        // (or return NaN, depending on your needs)
    }
    return n;
}
console.log(toNumber(1234567890123456789012345678n));
// => RangeError: Can't convert BigInt 1234567890123456789012345678n to Number,
//    loss of precision
