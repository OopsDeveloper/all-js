function tryRex(rex, str) {
    console.log(`lastIndex: ${rex.lastIndex}`);
    const match = rex.exec(str);
    if (match) {
        console.log(`Match:     ${match[0]}`);
        console.log(`At:        ${match.index}`);
    } else {
        console.log("No match");
    }
}

const str = "this is a test";

// Non-sticky, searches string:
tryRex(/test/, str);
// lastIndex: 0
// Match:     test
// At:        10

// Sticky, doesn't search, matches only at `lastIndex`:
const rex1 = /test/y;  // `rex.lastIndex` defaults to 0
tryRex(rex1, str);
// lastIndex: 0
// No match

const rex2 = /test/y;
rex2.lastIndex = 10;   // Sets where in the string we want to match
tryRex(rex2, str);
// lastIndex: 10
// Match:     test
// At:        10
