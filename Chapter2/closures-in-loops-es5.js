function closuresInLoopsES5() {
    for (var counter = 1; counter <= 3; ++counter) {
        (function(value) {
            setTimeout(function() {
                console.log(value);
            }, 10);
        })(counter);
    }
}
closuresInLoopsES5();
