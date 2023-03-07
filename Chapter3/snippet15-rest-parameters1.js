// In a later chapter you'll learn about the `for-of` loop, which you'd probably
// want here instead of `forEach`. But you'll also learn about `Object.assign`,
// which you could use instead of this entire function.
function extend(target, ...sources) {
    sources.forEach(source => {
        Object.keys(source).forEach(key => {
            target[key] = source[key];
        });
    });
    return target;
}
const obj = extend({}, {a: 1}, {b: 2});
console.log(obj);   // {a: 1, b: 2}
