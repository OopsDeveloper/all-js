function* collect(count) {
    const data = [];
    if (count < 1 || Math.floor(count) !== count) {
        throw new Error("count must be an integer >= 1");
    }
    do {
        let msg = "values needed: " + count;
        data.push(yield msg);
    } while (--count > 0);
    return data;
}

function* outer() {
    // Have `collect` collect two values:
    let data1 = yield* collect(2);
    console.log("data collected by collect(2) =", data1);
    // Have `collect` collect three values:
    let data2 = yield* collect(3);
    console.log("data collected by collect(3) =", data2);
    // Return an array of results
    return [data1, data2];
}

let g = outer();
let result;
console.log("next got:", g.next());
console.log("next got:", g.next("a"));
console.log("next got:", g.next("b"));
console.log("next got:", g.next("c"));
console.log("next got:", g.next("d"));
console.log("next got:", g.next("e"));
