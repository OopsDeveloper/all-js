import { counter, increment as inc } from "./mod.js";
console.log(counter); // 0
inc();
console.log(counter); // 1
counter = 42;         // TypeError: Assignment to constant variable.
