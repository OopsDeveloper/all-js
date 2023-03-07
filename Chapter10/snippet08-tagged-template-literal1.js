function example(template, ...values) {
    console.log(template);
    console.log(values);
}
const a = 1, b = 2, c = 3;
example`Testing ${a} ${b} ${c}.`;
// =>
// ["Testing ", " ", " ", "."]
// [1, 2, 3]
