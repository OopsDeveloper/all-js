// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.
// If any of the examples below don't work as expected, you may need to tell the environment you're
// running it in to use UTF-8 when reading the file (or convert the file to your default encoding).

// Match alphabetic properties:
const rex1 = /\p{Alphabetic}/gu;
const s1 = "Hello, I'm James.";
console.log(s1.match(rex1));
// => ["H", "e", "l", "l", "o", "I", "m", "J", "a", "m", "e", "s"]

// Match non-alphabetic properties:
const rex2 = /\P{Alphabetic}/gu;
const s2 = "Hello, I'm James.";
console.log(s2.match(rex2));
// => [",", " ", "\"", " ", "."]

// Match characters in Greek script:
const rex3 = /\p{Script_Extensions=Greek}/gu;
const s3 = "The greek letters alpha (α), beta (β), and gamma (γ) are used...";
console.log(s3.match(rex3));
// => ["α", "β", "γ"]

// Find punctuation, both listing General_Category explicitly and using
// the shorthand form leaving it off:
const rex4a = /\p{General_Category=Punctuation}/gu;
const rex4b = /\p{Punctuation}/gu;
const s4 = "Hello, my name is Pranay. It means \"romance\" in Hindi.";
console.log(s4.match(rex4a));
// => [",", "'", ".", "\"", "\"", "."]
console.log(s4.match(rex4b));
// => [",", "'", ".", "\"", "\"", "."]
