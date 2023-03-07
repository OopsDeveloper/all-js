import def from "./mod2.js";

const indentString = "  ";

export function indent(nest = 0) {
    return indentString.repeat(nest);
}

export function fn1(nest = 0) {
    console.log(`${indent(nest)}mod1 - fn1`);
    def(nest + 1);
}
