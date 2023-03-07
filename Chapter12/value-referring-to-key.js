function log(msg) {
    const p = document.createElement("pre");
    p.appendChild(document.createTextNode(msg));
    document.body.appendChild(p);
}

const AAAAExample = (() => {
    const privateMap = new WeakMap();

    return class AAAAExample {
        constructor(secret, limit) {
            privateMap.set(this, {counter: 0, owner: this});
        }

        get counter() {
            return privateMap.get(this).counter;
        }

        incrementCounter() {
            return ++privateMap.get(this).counter;
        }
    };
})();

const e = new AAAAExample();

let a = [];
document.getElementById("btn-create").addEventListener("click", function(e) {
    const count = +document.getElementById("objects").value || 100000;
    log(`Generating ${count} objects...`);
    for (let n = count; n > 0; --n) {
        a.push(new AAAAExample());
    }
    log(`Done, ${a.length} objects in the array`);
});
document.getElementById("btn-release").addEventListener("click", function(e) {
    a.length = 0;
    log("All objects released");
});
