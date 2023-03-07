let name = "foo" + Math.floor(Math.random() * 1000);

// The expression
const C = class TheClass {
    [name]() {
        console.log("This is the method " + name +
                    " in the class " + TheClass.name);
        // The class name is in-scope -^
        // within the definition
    }
}; // <== Semicolon needed here (although ASI will supply it
   //     if possible)

// The class's name was not added to this scope
console.log(typeof TheClass);      // "undefined"

// The value of the expression is the class
console.log(typeof C);             // "function"
