async function a() {
    return await Promise.resolve("a");
}
async function b() {
    return Promise.resolve("b");
}
a().then(value => console.log(value));
b().then(value => console.log(value));
