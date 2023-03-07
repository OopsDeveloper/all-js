let x = 1;
function example() {
    const y = 2;
    return function() {
        let z = 3;
        console.log(z, y, x);
    };
}
const f = example();
f();
