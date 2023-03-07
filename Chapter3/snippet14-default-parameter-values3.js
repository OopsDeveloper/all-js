function none() {
}
console.log(none.length);           // 0
function one(a) { 
}
console.log(one.length);            // 1
function two(a, b) {
}
console.log(two.length);            // 2
function stillOne(a, b = 42) {
}
console.log(stillOne.length);       // 1
function oneYetAgain(a, b = 42, c) {
}
console.log(oneYetAgain.length);    // 1
