// Function returning promise that is fulfilled after the given
// delay with the given value
function returnWithDelay(value, delay = 10) {
    return new Promise(resolve => setTimeout(resolve, delay, value));
}

// The function doing the work
function doSomething() {
    return returnWithDelay("original value")
        .finally(() => {
            return "value from finally";
        });
}

doSomething()
    .then(value => {
        console.log("value = " + value); // "value = original value"
    });
