function* example() {
    let n = 0;
    try {
        while (true) {
            yield n++;
        }
    } catch (e) {
        while (n >= 0) {
            yield n--;
        }
    }
}
const gen = example();
console.log(gen.next());             // {value: 0, done: false}
console.log(gen.next());             // {value: 1, done: false}
console.log(gen.throw(new Error())); // {value: 2, done: false}
console.log(gen.next());             // {value: 1, done: false}
console.log(gen.next());             // {value: 0, done: false}
console.log(gen.next());             // {value: undefined, done: true}
