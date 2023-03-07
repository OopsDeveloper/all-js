// Note: The chapter is missing a space in the `console.log` line that's corrected below
function stayContained() {
    var a = [1, 2, 3];
    for (var i = 0; i < a.length; ++i) {
        let value = a[i];
        console.log(value);
    }
    console.log("Outside loop " + value); // ReferenceError: 'value' is not defined
}
stayContained();
