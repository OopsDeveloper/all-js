function animate(type, duration = 300) {
    console.log(type + ", " + duration);
}
animate("fadeout");            // "fadeout, 300"
animate("fadeout", undefined); // "fadeout, 300" (again)
animate("fadeout", 200);       // "fadeout, 200"
