class Product {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get result() {
        return this.x * this.y;
    }
}
class DoubleProduct extends Product {
    get result() {
        // In this case, you'd just use `super`, like this:
        // return super.result * 2;
        // You'd use `Reflect.set` in cases where `super` isn't available
        const proto = Object.getPrototypeOf(Object.getPrototypeOf(this));
        return Reflect.get(proto, "result", this) * 2;
    }
}
const d = new DoubleProduct(10, 2);
console.log(d.result); // 40
