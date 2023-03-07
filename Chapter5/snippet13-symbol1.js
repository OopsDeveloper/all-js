class Example1 {
}
class Example2 {
    get [Symbol.toStringTag]() {
        return "Example2";
    }
}
console.log(new Example1().toString()); // "[object Object]"
console.log(new Example2().toString()); // "[object Example2]"
