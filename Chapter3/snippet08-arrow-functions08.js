function Thingy(value) {
    this.value = value;
    this.showDelay = 100;
}
Thingy.prototype.prep = function() {
    console.log("prep, value = " + this.value);
};
Thingy.prototype.show = function() {
    console.log("show, value = " + this.value);
};
Thingy.prototype.delayedPrepAndShow = function() {
    this.showTimer = setTimeout(() => {
        this.prep();
        this.show();
    }, this.showDelay);
};
const t = new Thingy(42);
t.delayedPrepAndShow();
