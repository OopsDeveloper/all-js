class Example {
    field;
}
const e = new Example();
console.log("field" in e);      // true
console.log(typeof e.field);    // "undefined"
