const a = ["a", "b", "c", "d"];
for (const value of a) {
    if (value === "c") {
        break; // This is just fine, it calls the iterator's `return`
    }
    console.log(value); // This line isn't in the chapter, but it's useful for seeing what's going on
}
