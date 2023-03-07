// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

// Defining the token replacer with configurable token matching
class Replacer {
    constructor(rexTokenMatcher = /\{\{([^}]+)\}\}/g) {
        this.rexTokenMatcher = rexTokenMatcher;
    }

    [Symbol.replace](str, replaceValue) {
        str = String(str);
        return str.replace(
            this.rexTokenMatcher,
            (_, token) => replaceValue[token] || ""
        );
    }
}
Replacer.default = new Replacer();

// Using the default token replacer with `replace`
const str = "Hello, my name is {{name}} and I'm {{age}}.";
const replaced = str.replace(Replacer.default, {
    name: "María Gonzales",
    age: 32
});
console.log(replaced); // "Hello, my name is María Gonzales and I'm 32."

// Using a custom token
const str2 = "Hello, my name is <name> and I'm <age>.";
const replacer = new Replacer(/<([^>]+)>/g) ;
const replaced2 = str2.replace(replacer, {
    name: "Joe Bloggs",
    age: 45
});
console.log(replaced2); // "Hello, my name is Joe Bloggs and I'm 45."
