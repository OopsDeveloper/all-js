// Not a new toy, this snippet shows the anonymous version of the named backreference
// shown by the next snippet
const rex = /(["']).+?\1/g;
const str = "testing 'a one', \"and'a two\", and'a three";
console.log(str.match(rex));    // ["'a one'", "\"and'a two\""]
