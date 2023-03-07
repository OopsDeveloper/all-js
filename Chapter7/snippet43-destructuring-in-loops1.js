const arr = [
    {name: "one", value: 1},
    {name: "two", value: 2},
    {name: "forty-two", value: 42}
];
for (const {name, value} of arr) {
    console.log("Name: " + name + ", value: " + value);
}
