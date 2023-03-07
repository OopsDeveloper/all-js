function worker(label) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject(new Error(label + " operation failed"));
            } else {
                resolve(label + " result");
            }
        }, Math.random() * 100);
    });
}
function firstOperation() {
    return worker("first");
}
function secondOperation() {
    return worker("second");
}
function thirdOperation() {
    return worker("third");
}

firstOperation()
.then(firstResult => secondOperation(firstResult))
.then(secondResult => thirdOperation(secondResult * 2))
.then(thirdResult => {
    console.log("final fulfillment handler, thirdResult:", thirdResult);
    if (Math.random() < 0.2) {
        throw new Error("final fulfillment handler threw");
    }
})
.catch(error => {
    console.error("rejection handler ran, rejection is:", error);
});
