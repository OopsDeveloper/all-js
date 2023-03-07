// Using `var`
function redundantRepetition() {
    var x = "alpha";
    console.log(x);
    // ...lots of code here...
    var x = "bravo";
    console.log(x);
    // ...lots of code here...
    return x;
}
redundantRepetition();
