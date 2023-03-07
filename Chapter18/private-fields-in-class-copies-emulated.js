// ==== Start: Code to emulate specification operations ====

// The names of the operations (NewPrivateName, PrivateFieldFind,
// PrivateFieldGet, and PrivateFieldFind) and their parameters
// (description, P, O, value) are from the spec.

// Creates a new Private Name with the given description.
// Private Names aren't described as objects in the spec, but it's
// convenient to use an object in this emulation.
function NewPrivateName(description) {
    return {description};
}

// Finds the given private field in the given object.
// P = the private name, O = the object.
function PrivateFieldFind(P, O) {
    const privateFieldValues = O["[[PrivateFieldValues]]"];
    const field = privateFieldValues.find(entry => entry["[[PrivateName]]"] === P);
    return field;
}

// Adds a new private field to an object (only possible during initial
// construction). P = the private name, O = the object, value = the value.
function PrivateFieldAdd(P, O, value) {
    if (PrivateFieldFind(P, O)) {
        throw new TypeError(`Field ${P.description} already defined for object`);
    }
    const field = {
        "[[PrivateName]]": P,
        "[[PrivateFieldValue]]": value
    };
    O["[[PrivateFieldValues]]"].push(field);
    return value;
}

// Gets the value of the given private field of the given object.
// P = the private name, O = the object.
function PrivateFieldGet(P, O) {
    const field = PrivateFieldFind(P, O);
    if (!field) {
        throw new TypeError(
            `Cannot read private member ${P.description} from an object ` +
            `whose class did not declare it`
        );
    }
    return field["[[PrivateFieldValue]]"];
}

// Sets the value of the given private field of the given object.
// P = the private name, O = the object, value = the value.
function PrivateFieldSet(P, O, value) {
    const field = PrivateFieldFind(P, O);
    if (!field) {
        throw new TypeError(
            `Cannot write private member ${P.description} to an object ` +
            `whose class did not declare it`
        );
    }
    field["[[PrivateFieldValue]]"] = value;
    return value;
}

// ==== END: Code to emulate specification operations ====

// Here's the code from private-fields-in-class-copies.js, updated to use the
// "spec" code above to emulate the private fields, to show approximately how
// they work under the covers.
function makeCounterClass() {
    // These next two lines emulate what the JavaScript engine does when it
    // starts processing the `class` definition:
    // 1. Creating the private name environment and linking it to the `class`
    //    definition (in this code, the "link" is that code in the class closes
    //    over the `privateNameEnvironment` constant).
    // 2. Doing the once-per-class part of the `#value;` definition: Creating
    //    the Private Name for the private name identifier and storing it in the
    //    private name environment.
    const privateNameEnvironment = new Map();
    privateNameEnvironment.set("#value", NewPrivateName("#value"));
    return class Counter {
        // Original code: #value;

        constructor(start = 0) {
            // Emulates the part of object construction that creates the
            // [[PrivateFieldValues]] internal slot.
            this["[[PrivateFieldValues]]"] = [];

            // Emulates the per-object part of the `#value;` definition
            PrivateFieldAdd(privateNameEnvironment.get("#value"), this, undefined);

            // Original code: this.#value = start;
            PrivateFieldSet(privateNameEnvironment.get("#value"), this, start);
        }

        increment() {
            // Original code: return ++this.#value;
            const privateName = privateNameEnvironment.get("#value");
            const temp = PrivateFieldGet(privateName, this);
            return PrivateFieldSet(privateName, this, temp + 1);
        }

        get value() {
            // Original code: return this.#value;
            return PrivateFieldGet(privateNameEnvironment.get("#value"), this);
        }

        static show(counter) {
            // Original code: console.log(`counter.#value = ${counter.#value}`);
            const value =
                PrivateFieldGet(privateNameEnvironment.get("#value"), counter);
            console.log(`counter.#value = ${value}`);
        }
    };
}

const Counter1 = makeCounterClass();
const Counter2 = makeCounterClass();

const c = new Counter1();
c.increment();
Counter1.show(c);   // "counter.#value = 1"
Counter2.show(c);   // TypeError: attempted to get private field on non-instance
