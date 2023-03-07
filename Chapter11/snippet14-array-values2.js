const a = [, "x", , , "y"];
for (const value of a.values()) {
    console.log(value);
}
// =>
// undefined
// "x"
// undefined
// undefined
// "y"
