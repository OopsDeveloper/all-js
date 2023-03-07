// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.
// If any of the examples below don't work as expected, you may need to tell the environment you're
// running it in to use UTF-8 when reading the file (or convert the file to your default encoding).

console.log("Basic lookbehind:");
const str1 = "We sold 10 cases for £20 each, and 5 cases for £12.99 each";
const rex1 = /(?<=£)[\d.]+/g;
console.log(str1.match(rex1));
// => ["20", "12.99"]

console.log("Lookbehind with multiple regular expression elements:");
const str2 = 'The codes are: 1E7 ("blue fidget"), 2G9 ("white flugel"),' +
             'and 17Y7 ("black diamond")';
const rex2 = /(?<=\d+[a-zA-Z]\d+ \(").+?(?="\))/g;
console.log(str2.match(rex2));
// => ["blue fidget", "white flugel", "black diamond"]

console.log("Naively negating the lookbehind from `rex1`:");
const str3 = "We sold 10 cases for £20 each, and 5 cases for £12.99 each";
const rex3 = /(?<!£)[\d.]+/g;
console.log(str3.match(rex3));
// => ["10", "0", "5", "2.99"]

console.log("Correcting that by limiting more:");
const str4 = "We sold 10 cases for £20 each, and 5 cases for £12.99 each";
const rex4 = /(?<![£\d.])[\d.]+/g;
console.log(str4.match(rex4));
// => ["10", "5"]

console.log("Greediness is right-to-left in a lookbehind...");
const behind = /(?<=(?<left>\w+)(?<right>\w+))\d$/;
const behindMatch = "ABCD1".match(behind);
console.log(behindMatch.groups.left);
// => "A"
console.log(behindMatch.groups.right);
// => "BCD"

console.log("...but left-to-right otherwise, including in a lookahead:");
const ahead = /\d(?=(?<left>\w+)(?<right>\w+))/;
const aheadMatch = "1ABCD".match(ahead);
console.log(aheadMatch.groups.left);
// => "ABC"
console.log(aheadMatch.groups.right);
// => "D"

console.log("Capture group numbering is left-to-right even in lookbehinds:");
const behindAgain = /(?<=(\w+)(\w+))\d$/;
const behindMatchAgain = "ABCD1".match(behindAgain);
console.log(behindMatchAgain[1]);
// => "A"
console.log(behindMatchAgain[2]);
// => "BCD"

console.log("In a lookbehind, you can't refer to a group from the right of it");
console.log("as you normally would:");
const referring1 = /(?<=(["'])\w+\1)X/;     // Doesn't make sense
console.log(referring1.test("'testing'X"));
// => false

console.log("In a lookbehind, you refer to it from the left instead, because");
console.log("they're processed right-to-left:");
const referring2 = /(?<=\1\w+(["']))X/;
console.log(referring2.test("'testing'X"));
// => true

console.log("In a lookbehind, you refer to it from the left instead, because");
console.log("they're processed right-to-left:");
const referring3 = /(?<=\k<quote>\w+(?<quote>["']))X/;
console.log(referring3.test("'testing'X"));
// => true
