const obj = {
    [Symbol.toPrimitive](hint) {
        const result = hint === "string" ? "str" : 42;
        console.log("hint = " + hint + ", returning " + JSON.stringify(result));
        return result;
    }
};

// Using the addition operator:
console.log("foo" + obj);
// hint = default
// foo42
console.log(2 + obj);
// hint = default
// 44

// Using the subtraction operator:
console.log(2 - obj);
// hint = number
// -40

// Using when string is desired:
console.log(String(obj));
// hint = string
// str
console.log("this is a string".indexOf(obj));
// hint = string
// 10 (the index of "str" in "this is a string")
