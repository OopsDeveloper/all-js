class Thingy {
    static standardThingy = new Thingy("A standard Thingy");
    static anotherStandardThingy = new Thingy(
        Thingy.standardThingy.label.replace("A", "Another")
    );

    constructor(label) {
        this.label = label;
    }
}

console.log(Thingy.standardThingy.label);           // "A standard Thingy"
console.log(Thingy.anotherStandardThingy.label);    // "Another standard Thingy"
