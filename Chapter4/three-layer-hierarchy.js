class Base {
    test() {
        return "Base test";
    }
}
class Sub extends Base {
    test() {
        return "Sub test > " + super.test();
    }
}
class SubSub extends Sub {
    test() {
        return "SubSub test > " + super.test();
    }
}

// Usage:
const obj = new SubSub();
console.log(obj.test()); // SubSub test > Sub test > Base test
