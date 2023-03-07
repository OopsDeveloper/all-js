// The "API function"
const noop = () => {}; // A function that does nothing
/* Does something.
 * @param   data        The data to do something with
 * @param   time        The time to take
 * @param   onSuccess   Callback for success, called with two arguments:
 *                      the result, and a status code
 * @param   onError     Callback for failure, called with one argument
 *                      (an error message as a string).
 */
function doSomething({ data, time = 10, onSuccess = noop, onError = noop} = {}) {
    setTimeout(() => {
        // For mock-up, fail about 10% of the time
        if (Math.random() < 0.1) {
            onError("failed");
        } else {
            // Just for mock-up purposes, data is a string, make it upper-case
            // Pass "okay" for status
            onSuccess(String(data).toUpperCase(), "okay");
        }
    }, time);
}

// The wrapper
function promiseSomething(options = {}) {
    return new Promise((resolve, reject) => {
        doSomething({
            ...options,
            // Since `doSomething` calls `onSuccess` with two
            // arguments, we need to wrap them up in an object
            // to pass to `resolve`
            onSuccess(result, status) {
                resolve({result, status});
            },
            // `doSomething` calls `onError` with a string error,
            // wrap it in an Error instance
            onError(message) {
                reject(new Error(message));
            }
        });
    });
}

// Using it
promiseSomething({data: "example"})
    .then(({result, status}) => {
        console.log("Got:", result, status);
    })
    .catch(error => {
        console.error(error);
    });
