// Function returning promise that is fulfilled after the given
// delay with the given value
function returnWithDelay(value, delay = 100) {
    return new Promise(resolve => setTimeout(resolve, delay, value));
}

// The function doing the work
function doSomething() {
    return returnWithDelay("original value")
        .finally(() => {
            return returnWithDelay("unused value from finally", 1000);
        })
}

console.time("example");
doSomething()
    .then(value => {
        console.log("value = " + value); // "value = original value"
        console.timeEnd("example");      // example: 1100ms (or similar)
    });
