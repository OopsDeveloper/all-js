const obj = {
    toString() {
        return super.toString().toUpperCase();
    }
};
Object.setPrototypeOf(obj, {
    toString() {
        return "a different string";
    }
});
console.log(obj.toString()); // "A DIFFERENT STRING"
