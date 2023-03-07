let name = "foo" + Math.floor(Math.random() * 1000);
class SomeClass {
    [name]() {
        console.log("Method " + name + " called");
    }
}

new SomeClass()[name](); // Method foo127 called
