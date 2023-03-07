// `reject` using just a string
function delayedFailure1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("failed 1"); // Rejecting with a value that isn't an Error instance
        }, 800);
    });
}
async function example1() {
    try {
        await delayedFailure1();
        console.log("Done"); // (Execution doesn't get here)
    } catch (error) {
        console.error("Caught:", error); // Caught: "failed 1"
    }
}
example1();

// `throw` using just a string
function delay(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}
async function delayedFailure2() {
    await delay(800);
    throw "failed 2"; // Throwing a value that isn't an Error instance
}
function example2() {
    delayedFailure2()
        .then(() => {
            console.log("Done"); // (Execution doesn't get here)
        })
        .catch(error => {
            console.error("Caught:", error); // Caught: "failed 2"
        });
}
example2();
