const p1 = {
    greet: function() {
        console.log("p1 greet, name = " + this.name);
    }
};
const p2 = {
    greet: function() {
        console.log("p2 greet, name = " + this.name);
    }
};
const obj = Object.create(p1);
obj.name = "Joe";
obj.greet();    // p1 greet, name = Joe
obj.__proto__ = p2;
obj.greet();    // p2 greet, name = Joe
