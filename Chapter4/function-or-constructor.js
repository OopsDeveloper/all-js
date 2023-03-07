const TwoWays = function TwoWays() {
    if (!new.target) {
        console.log("Called directly; using 'new' instead");
        return new TwoWays();
    }
    console.log("Called via 'new'");
};
console.log("With new:");
let t1 = new TwoWays();
// "Called via 'new'"

console.log("Without new:");
let t2 = TwoWays();
// "Called directly; using 'new' instead"
// "Called via 'new'"
