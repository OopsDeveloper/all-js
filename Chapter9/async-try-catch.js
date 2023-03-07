function delayedFailure() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("failed"));
        }, 800);
    });
}
async function example() {
    try {
        await delayedFailure();
        console.log("Done"); // (Execution doesn't get here)
    } catch (error) {
        console.error("Caught:", error);
    }
}
example();
