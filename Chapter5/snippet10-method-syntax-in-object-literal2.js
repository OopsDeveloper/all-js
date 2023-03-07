const obj = {
    toString() {
        return super.toString().toUpperCase();
    }
};
console.log(obj.toString()); // "[OBJECT OBJECT]"
