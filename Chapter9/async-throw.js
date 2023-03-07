function delay(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}
async function delayedFailure() {
    await delay(800);
    throw new Error("failed");
}
function example() {
    delayedFailure()
        .then(() => {
            console.log("Done"); // (Execution doesn't get here)
        })
        .catch(error => {
            console.error("Caught:", error);
        });
}
example();
