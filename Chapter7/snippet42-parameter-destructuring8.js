let [{a, b = "b def"} = {a: "param def a", b: "param def b"}] = [];
console.log(a, b);  // "param def a" "param def b"
