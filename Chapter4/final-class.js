class Thingy {
    constructor() {
        if (new.target !== Thingy) {
            throw new Error("Thingy subclasses aren't supported.");
        }
    }
}
class InvalidThingy extends Thingy {
}

console.log("Creating Thingy...");
const t = new Thingy();         // works
console.log("Creating InvalidThingy...");
const i = new InvalidThingy();  // Error: "Thingy subclasses aren't supported."
