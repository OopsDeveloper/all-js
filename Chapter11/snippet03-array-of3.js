class MyArray extends Array {
    niftyMethod() {
        // ...do something nifty...
    }
}
const a = MyArray.of("one", "two", "three");
console.log(a instanceof MyArray);  // true
console.log(a);                     // ["one", "two", "three"]
