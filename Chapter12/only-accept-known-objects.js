const Thingy = (() => {
    const known = new WeakSet();
    let nextId = 1;

    return class Thingy {
        constructor(name) {
            this.name = name;
            this.id = nextId++;
            Object.freeze(this);
            known.add(this);
        }

        action() {
            if (!known.has(this)) {
                throw new Error("Unknown Thingy");
            }
            // Code here knows that this object was created
            // by this class
            console.log(`Action on Thingy #${this.id} (${this.name})`);
        }
    }
})();

// In other code using it:

// Using real ones
const t1 = new Thingy("t1");
t1.action(); // Action on Thingy #1 (t1)
const t2 = new Thingy("t2");
t2.action(); // Action on Thingy #2 (t2)

// Trying to use a fake one
const faket2 = Object.create(Thingy.prototype);
faket2.name = "faket2";
faket2.id = 2;
Object.freeze(faket2);
faket2.action(); // Error: Unknown Thingy
