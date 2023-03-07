const mySymbol = Symbol();
const obj = {
    [mySymbol]: 6                   // Computed property name
};
const anotherSymbol = Symbol();
obj[anotherSymbol] = 7;             // Brackets notation
console.log(obj[mySymbol]);         // 6
console.log(obj[anotherSymbol]);    // 7
