const sharedUsefulProperty = Symbol.for("usefulProperty");
class Example {
    [sharedUsefulProperty] = "example";
    show() {
        console.log(this[sharedUsefulProperty]);
    }
}
const ex = new Example();
ex.show();  // "example"
