function thenableResolve(value) {
    return {
        then(onFulfilled) {
            // A thenable may call its callback synchronously like this; a native
            // promise never will. This example uses a synchronous callback to
            // avoid giving the impression that the mechanism used to make it
            // asynchronous is the cause of the extra tick.
            onFulfilled(value);
        }
    };
}
async function a() {
    return await thenableResolve("a");
}
async function b() {
    return thenableResolve("b");
}
a().then(value => console.log(value));
b().then(value => console.log(value));
