const rex = /(?<quote>["']).+?\k<quote>/g;
const str = "testing 'a one', \"and'a two\", and'a three";
console.log(str.match(rex));    // ["'a one'", "\"and'a two\""]
