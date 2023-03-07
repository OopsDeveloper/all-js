function traditional() {
}
const arrow = () => {
};
console.log("prototype" in traditional);    // true
console.log("prototype" in arrow);          // false
