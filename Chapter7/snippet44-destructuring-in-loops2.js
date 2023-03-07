const obj = {a: 1, b: 2, c: 3};
for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
        const value = obj[name];
        console.log(name + " = " + value);
    }
}
