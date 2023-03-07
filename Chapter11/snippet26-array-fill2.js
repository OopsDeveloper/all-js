const a = Array(2).fill({});
a[0].name = "Joe";
a[1].name = "Bob";
console.log(a[0].name); // "Bob"
