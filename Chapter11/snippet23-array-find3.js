const a = ["one", "two", "three"];
const x = a.find((value, index) => {
    console.log(`Visiting index ${index}: ${value}`);
    if (index === 0) {
        a[2] = a[2].toUpperCase();
    } else if (index === 1) {
        a.push("four");
    }
    return value === "four";
});
console.log(x);
// =>
// Visiting index 0: one
// Visiting index 1: two
// Visiting index 2: THREE
// undefined