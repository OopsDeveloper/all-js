// (This example should probably use `toLocaleLowerCase` rather than `toLowerCase`, but
// it doesn't matter for the *specific* data used below. Still...)
const a = ["b", "B", "a", "A", "c", "C"];
a.sort((left, right) => left.toLowerCase().localeCompare(right.toLowerCase()));
console.log(a);
