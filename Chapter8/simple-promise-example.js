function example() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const succeed = Math.random() < 0.5;
                if (succeed) {
                    console.log("resolving with 42 (will fulfill the promise)");
                    resolve(42);
                } else {
                    console.log("rejecting with new Error('failed')");
                    throw new Error("failed");
                }
            } catch (e) {
                reject(e);
            }
        }, 100);
    });
}

example()
.then(value => {  // fulfillment handler
    console.log("fulfilled with", value);
})
.catch(error => { // rejection handler
    console.error("rejected with", error);
})
.finally(() => {  // finally handler
    console.log("finally");
});
