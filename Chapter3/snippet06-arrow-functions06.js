// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

const a = ["Joe", "Mohammed", "María"];
const b = a.map(name => {name: name}); // Doesn't work
console.log(b);
