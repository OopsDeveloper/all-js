const p = {
    hi() {
        console.log("hi");
    }
};
const obj = {
    __proto__: p
};
obj.hi(); // "hi"
