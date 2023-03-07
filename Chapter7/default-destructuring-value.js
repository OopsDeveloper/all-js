function getDefault(val) {
    console.log("defaulted to " + val);
    return val;
}
const obj = {first: 1, second: 2, third: 3, fourth: undefined};
const {
    third = getDefault("three"),
    fourth = getDefault("four"),
    fifth = getDefault("five")
} = obj;
// "defaulted to four"
// "defaulted to five"
console.log(third);  // 3
console.log(fourth); // "four"
console.log(fifth);  // "five"
