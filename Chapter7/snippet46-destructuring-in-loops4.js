const obj = {a: 1, b: 2, c: 3};
for (const [name, value] of Object.entries(obj)) {
    console.log(name + " = " + value);
}
