function logAndReturn(str) {
    console.log(str);
    return str;
}
class BaseExample {
    baseProp = logAndReturn("baseProp");
    constructor() {
        console.log("BaseExample");
    }
}
class SubExample extends BaseExample {
    subProp1 = logAndReturn("example");
    subProp2 = logAndReturn(this.subProp1.toUpperCase());
    constructor() {
        console.log("SubExample before super()");
        super();
        console.log("SubExample after super()");
        console.log(`this.subProp1 = ${this.subProp1}`);
        console.log(`this.subProp2 = ${this.subProp2}`);
    }
}
new SubExample();
