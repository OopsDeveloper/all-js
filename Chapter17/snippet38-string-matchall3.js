const s = "Testing a-1, b-2, c-3";
for (const {index, groups: {type, num}} of s.matchAll(/(?<type>\w)-(?<num>\d)/g)) {
    console.log(`"${type}": "${num}" at ${index}`);
}
// => "a": "1" at 8
// => "b": "2" at 13
// => "c": "3" at 18
