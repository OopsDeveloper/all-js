const s = "Testing a-1 b-2 c-3";
const rex = /(\w)-(\d)/g;
while (rex.exec(s)) {
    // NOT RECOMMENDED!
    console.log(`"${RegExp.$1}": "${RegExp.$2}"`);
}
// => "a": "1"
// => "b": "2"
// => "c": "3"
