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
