function example({a, b = "prop b def"} = {a: "param def a", b: "param def b"}) {
    console.log(a, b);
}
example();              // "param def a" "param def b"
example({a: "ayy"});    // "ayy" "prop b def"
