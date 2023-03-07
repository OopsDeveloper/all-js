function example(template, value0, value1, value2) {
    console.log(template);
    console.log(value0, value1, value2);
}
const a = 1, b = 2, c = 3;
example`Testing ${a} ${b} ${c}.`;
