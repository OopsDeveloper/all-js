function* sumThree() {
    const lastThree = [];
    let sum = 0;
    while (true) {
        const value = yield sum;
        lastThree.push(value);
        sum += value;
        if (lastThree.length > 3) {
            sum -= lastThree.shift();
        }
    }
}

const it = sumThree();
console.log(it.next().value);  // 0  (there haven't been any values passed in yet)
console.log(it.next(1).value); // 1  (1)
console.log(it.next(7).value); // 8  (1 + 7)
console.log(it.next(4).value); // 12 (1 + 7 + 4)
console.log(it.next(2).value); // 13 (7 + 4 + 2; 1 "fell off")
console.log(it.next(3).value); // 9  (4 + 2 + 3; 7 "fell off")
