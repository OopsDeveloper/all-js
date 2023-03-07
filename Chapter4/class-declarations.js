// Trying to use `TheClass` here would result in a ReferenceError
// because of the Temporal Dead Zone

let name = "foo" + Math.floor(Math.random() * 1000);

// The declaration
class TheClass {
    // Since the declaration is processed as part of the
    // step-by-step code, we can use `name` here and know that
    // it will have the value we assigned it above
    [name]() {
        console.log("This is the method " + name);
    }
} // <== No semicolon expected here

// A global was created
console.log(typeof TheClass);      // "function"

// But no property on the global object
console.log(typeof this.TheClass); // "undefined"
