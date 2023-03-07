const s = "example";
console.log(`|${s.padStart(10, "-*")}|`);
// => "|-*-example|"
console.log(`|${s.padEnd(10, "-*")}|`);
// => "|example-*-|"
console.log(`|${s.padStart(14, "...oooOOO")}|`);
// => "|...oooOexample|"
