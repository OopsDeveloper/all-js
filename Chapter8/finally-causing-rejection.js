// Function returning promise that is fulfilled after the given
// delay with the given value
function returnWithDelay(value, delay = 100) {
    return new Promise(resolve => setTimeout(resolve, delay, value));
}

// Function returning promise that is *rejected* after the given
// delay with the given error
function rejectWithDelay(error, delay = 100) {
    return new Promise((resolve, reject) => setTimeout(reject, delay, error));
}

console.time("example");
returnWithDelay("original value")
    .finally(() => {
        return rejectWithDelay(new Error("error from finally"), 1000);
    })
    .then(value => {
        // Not called
        console.log("value = " + value);
    })
    .catch(error => {
        console.error("error = ", error);   // "error =  Error: error from finally"
    })
    .finally(() => {
        console.timeEnd("example");         // example: 1100ms (or similar)
    });
