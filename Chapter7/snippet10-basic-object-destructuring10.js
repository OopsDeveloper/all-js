// ==== Prep for the snippet:

function getSomeObject() {
    return {
        first: 1,
        second: 2
    };
}

// ==== The snippet:

let first, second;
// ...
({ first, second } = getSomeObject()); // Works
