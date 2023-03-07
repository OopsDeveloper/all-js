console.log("mod2 evaluation - begin");

// Artificial delay function
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => {
        resolve(value);
    }, ms));
}

// export const two = "two";                  // Not using top-level `await`
export const two = await delay(10, "two"); // Using top-level `await`

console.log("mod2 evaluation - end");
