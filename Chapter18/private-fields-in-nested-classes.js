class Outer {
    #outerField;
    constructor(value) {
        this.#outerField = value;
    }
    static createInner() {
        return class Inner {
            #innerField;
            constructor(value) {
                this.#innerField = value;
            }
            access(o) {
                console.log(`this.#innerField = ${this.#innerField}`);
                // Works, because #outerField is in scope:
                console.log(`o.#outerField = ${o.#outerField}`);
            }
        };
    }
}
const Inner = Outer.createInner();
const o = new Outer(1);
const i = new Inner(2);
i.access(o);
// =>
// this.#innerField = 2
// o.#outerField = 1
