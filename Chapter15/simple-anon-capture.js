const rex = /testing (\d+)/g;
const result = rex.exec("This is a test: testing 123 testing");
console.log(result[0]);     // testing 123
console.log(result[1]);     // 123
console.log(result.index);  // 16
console.log(result.input);  // "This is a test: testing 123 testing"
