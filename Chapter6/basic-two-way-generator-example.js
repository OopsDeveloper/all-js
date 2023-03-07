function* add() {
    console.log("starting");
    const value1 = yield "Please provide value 1";
    console.log("value1 is " + value1);
    const value2 = yield "Please provide value 2";
    console.log("value2 is " + value2);
    return value1 + value2;
}

let result;
const gen = add();
result = gen.next();    // "starting"
console.log(result);    // {value: "Please provide value 1", done: false}
result = gen.next(35);  // "value1 is 35"
console.log(result);    // {value: "Please provide value 2", done: false}
result = gen.next(7);   // "value2 is 7"
console.log(result);    // {value: 42, done: true}
