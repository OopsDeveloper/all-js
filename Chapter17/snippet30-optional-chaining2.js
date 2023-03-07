const obj = {
    foo: {
        val: 42
    }
};

try {
    console.log(obj?.bar.val); // TypeError: Cannot read property 'val' of undefined
} catch (e) {
    console.error(`${e.name}: ${e.message}`);
}
console.log(obj?.bar?.val);    // undefined
