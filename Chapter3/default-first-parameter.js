function animate(type = "fadeout", duration) {
    console.log(type + ", " + duration);
}
animate("fadeout", 300);    // "fadeout, 300"
animate(undefined, 300);    // "fadeout, 300" (again)
animate("fadein",  300);    // "fadein, 300"
animate();                  // "fadeout, undefined"
