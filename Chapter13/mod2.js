import { fn1, indent } from "./mod1.js";

export function fn2(nest = 0) {
    console.log(`${indent(nest)}mod2 - fn2`);
    fn1(nest + 1);
}

export default function(nest = 0) {
    console.log(`${indent(nest)}mod2 - default`);
}
