class Base {
    constructor() {
        console.log(new.target.name);
    }
}

class Sub extends Base {
    // (This is exactly what the default constructor would be, but I've included
    // it for clarity, to explicitly show the `super()` call.)
    constructor() {
        super();
    }
}
new Sub(); // "Sub"
