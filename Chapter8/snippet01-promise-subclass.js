class MyPromise extends Promise {
}
const p1 = MyPromise.resolve(42);
const p2 = p1.then(() => { /*...*/});
console.log(p1 instanceof MyPromise); // true
console.log(p2 instanceof MyPromise); // true
