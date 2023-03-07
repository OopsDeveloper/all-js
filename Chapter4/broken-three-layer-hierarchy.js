function getFakeSuper(o) {
    return Object.getPrototypeOf(Object.getPrototypeOf(o));
}
class Base {
    test() {
        console.log("Base's test");
        return "Base test";
    }
}
class Sub extends Base {
    test() {
        console.log("Sub's test");
        return "Sub test > " + getFakeSuper(this).test.call(this);
    }
}
class SubSub extends Sub {
    test() {
        console.log("SubSub's test");
        return "SubSub test > " + getFakeSuper(this).test.call(this);
    }
}

// Usage:
const obj = new SubSub();
console.log(obj.test()); // "SubSub's test", then "Sub's test" repeatedly
                         // until a stack overflow error occurs
