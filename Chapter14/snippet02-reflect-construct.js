// Defining the function that builds custom errors
function buildCustomError(...args) {
    return Reflect.construct(Error, args, buildCustomError);
}
buildCustomError.prototype = Object.assign(Object.create(Error.prototype), {
    constructor: buildCustomError,
    report() {
        console.log(`this.message = ${this.message}`);
    }
});

// Using it
const e = buildCustomError("error message here");
console.log("instanceof Error", e instanceof Error);
e.report();
console.log(e);
