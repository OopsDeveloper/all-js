// ==== Prep for the snippet:

function theOperation() {
    console.log("theOperation -- throwing");
    throw new Error();
}
function doSomethingElse() {
    console.log("doSomethingElse");
}

// ==== The snippet:

try {
    theOperation();
} catch {
    doSomethingElse();
}
// =>
// theOperation -- throwing
// doSomethingElse
