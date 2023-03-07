class SuperClass {
    test() {
        return "SuperClass's test";
    }
}
class SubClass extends SuperClass {
    test1() {
        return "SubClass's test1: " + super.test();
    }
}
SubClass.prototype.test2 = function() {
    return "SubClass's test2: " + super.test();      // ERROR HERE
};

const obj = new SubClass();
obj.test1();
obj.test2();
