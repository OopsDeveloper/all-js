// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.
// If any of the examples below don't work as expected, you may need to tell the environment you're
// running it in to use UTF-8 when reading the file (or convert the file to your default encoding).

// From: https://github.com/tc39/proposal-regexp-unicode-property-escapes
// (Modified to use shorthand properties for page-formatting reasons)
const regex = /([\p{Alpha}\p{M}\p{digit}\p{Pc}\p{Join_C}]+)/gu;
const text = `
Amharic: የኔ ማንዣበቢያ መኪና በዓሣዎች ተሞልቷል
Bengali: আমার হভারক্রাফ্ট কুঁচে মাছ-এ ভরা হয়ে গেছে
Georgian: ჩემი ხომალდი საჰაერო ბალიშზე სავსეა გველთევზებით
Macedonian: Моето летачко возило е полно со јагули
Vietnamese: Tàu cánh ngầm của tôi đầy lươn
`;

let match;
while (match = regex.exec(text)) {
    const word = match[1];
    console.log(`Matched word with length ${ word.length }: ${ word }`);
}

// Result:
// Matched word with length 7: Amharic
// Matched word with length 2: የኔ
// Matched word with length 6: ማንዣበቢያ
// Matched word with length 3: መኪና
// Matched word with length 5: በዓሣዎች
// Matched word with length 5: ተሞልቷል
// Matched word with length 7: Bengali
// Matched word with length 4: আমার
// Matched word with length 11: হভারক্রাফ্ট
// Matched word with length 5: কুঁচে
// Matched word with length 3: মাছ
// Matched word with length 1: এ
// Matched word with length 3: ভরা
// Matched word with length 3: হয়ে
// Matched word with length 4: গেছে
// Matched word with length 8: Georgian
// Matched word with length 4: ჩემი
// Matched word with length 7: ხომალდი
// Matched word with length 7: საჰაერო
// Matched word with length 7: ბალიშზე
// Matched word with length 6: სავსეა
// Matched word with length 12: გველთევზებით
// Matched word with length 10: Macedonian
// Matched word with length 5: Моето
// Matched word with length 7: летачко
// Matched word with length 6: возило
// Matched word with length 1: е
// Matched word with length 5: полно
// Matched word with length 2: со
// Matched word with length 6: јагули
// Matched word with length 10: Vietnamese
// Matched word with length 3: Tàu
// Matched word with length 4: cánh
// Matched word with length 4: ngầm
// Matched word with length 3: của
// Matched word with length 3: tôi
// Matched word with length 3: đầy
// Matched word with length 4: lươn
