function emulateUntagged(template, ...values) {
    return template.reduce((acc, str, index) => acc + values[index - 1] + str);
}
const a = 1, b = 2, c = 3;
console.log(emulateUntagged`Testing ${a} ${b} ${c}.`);  // "Testing 1 2 3."