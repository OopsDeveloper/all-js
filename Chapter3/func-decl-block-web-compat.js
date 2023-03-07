function branching(num) {
    console.log("num = " + num + ", typeof doSomething = " + typeof doSomething);
    if (num < 0.5) {
        console.log("true branch, typeof doSomething = " + typeof doSomething);
        function doSomething() {
            console.log("true");
        }
        console.log("end of true block");
    } else {
        console.log("false branch, typeof doSomething = " + typeof doSomething);
        function doSomething() {
            console.log("false");
        }
        console.log("end of false block");
    }
    doSomething();
}
branching(Math.random());
