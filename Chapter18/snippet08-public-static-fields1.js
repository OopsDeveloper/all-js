class Thingy {
    static standardThingy = new Thingy("A standard Thingy");
    static anotherStandardThingy = new Thingy("Another standard Thingy");

    constructor(label) {
        this.label = label;
    }
}

console.log(Thingy.standardThingy.label);           // "A standard Thingy"
console.log(Thingy.anotherStandardThingy.label);    // "Another standard Thingy"
