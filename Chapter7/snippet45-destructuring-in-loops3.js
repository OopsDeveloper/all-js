const obj = {a: 1, b: 2, c: 3};
for (const entry of Object.entries(obj)) {
    console.log(entry[0] + " = " + entry[1]);
}
