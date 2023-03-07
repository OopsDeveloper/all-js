const p = {
    hi() {
        console.log("hi");
    }
};
const name = "__proto__"; // <===\\
const obj = {             //      Doesn't work this way
    [name]: p             // <===//
};
obj.hi(); // TypeError: obj.hi is not a function
