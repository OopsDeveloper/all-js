function worker(label, callback) {
    setTimeout(() => {
        if (Math.random() < 0.2) {
            callback(new Error(label + " operation failed"));
        } else {
            callback(null, label + " result");
        }
    }, Math.random() * 100);
}
function firstOperation(callback) {
    return worker("first", callback);
}
function secondOperation(value, callback) {
    return worker("second", callback);
}
function thirdOperation(value, callback) {
    return worker("third", callback);
}

firstOperation((error, firstResult) => {
    if (error) {
        console.error("got error (1):", error);
    } else {
        secondOperation(firstResult, (error, secondResult) => {
            if (error) {
                console.error("got error (2):", error);
            } else {
                thirdOperation(secondResult * 2, (error, thirdResult) => {
                    if (error) {
                        console.error("got error (3):", error);
                    } else {
                        try {
                            console.log("final else, thirdResult:", thirdResult);
                            if (Math.random() < 0.2) {
                                throw new Error("final else code threw");
                            }
                        } catch (error) {
                            console.error("got error (4):", error);
                        }
                    }
                });
            }
        });
    }
});
