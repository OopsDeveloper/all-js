const str = "Testing\nAlpha\nBravo\nCharlie\nJavaScript";
console.log(str.match(/.[A-Z]/g));  // ["aS"]
console.log(str.match(/.[A-Z]/gs)); // ["\nA", "\nB", "\nC", "aS"]
