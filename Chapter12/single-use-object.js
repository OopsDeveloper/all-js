const SingleUseObject = (() => {
    const used = new WeakSet();

    return class SingleUseObject {
        constructor(name) {
            this.name = name;
        }
        use() {
            if (used.has(this)) {
                throw new Error(`${this.name} has already been used`);
            }
            console.log(`Using ${this.name}`);
            used.add(this);
        }
    };
})();

const suo1 = new SingleUseObject("suo1");
const suo2 = new SingleUseObject("suo2");
suo1.use();                               // Using suo1
try {
    suo1.use();
} catch (e) {
    console.error("Error: " + e.message); // Error: suo1 has already been used
}
suo2.use();                               // Using suo2
