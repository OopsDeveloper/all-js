this.addEventListener("message", e => {
    if (e.data && e.data.type === "init") {
        let {sharedArray} = e.data;
        console.log("(worker) sharedArray[0] = " + sharedArray[0]);
        console.log("(worker) sharedArray.buffer.foo = " + sharedArray.buffer.foo);
        console.log("(worker) sharedArray.bar = " + sharedArray.bar);
    }
});
