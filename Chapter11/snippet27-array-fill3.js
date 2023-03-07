// You probably wouldn't use `Array.prototype.fill` if you wanted to fill an array
// with discrete objects, you'd use `Array.from`, like this:
const a = Array.from({length: 2}, () => ({}));
a[0].name = "Joe";
a[1].name = "Bob";
console.log(a[0].name); // Joe
