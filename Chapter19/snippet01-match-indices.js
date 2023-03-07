const rex = /(\w+) (\d+)/;
const str = "==> Testing 123";
const match = rex.exec(str);
for (const [start, end] of match.indices) {
    console.log(`[${start}, ${end}]: "${str.substring(start, end)}"`);
}
// =>
// [4, 15]: "Testing 123"
// [4, 11]: "Testing"
// [12, 15]: "123"