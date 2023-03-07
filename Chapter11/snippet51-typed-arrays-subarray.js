const wholeArray = Uint8Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
const firstHalf = wholeArray.subarray(0, 5);
console.log(wholeArray);    // Uint8Array [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(firstHalf);     // Uint8Array [ 0, 1, 2, 3, 4 ]
firstHalf[0] = 100;
console.log(wholeArray);    // Uint8Array [ 100, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(firstHalf);     // Uint8Array [ 100, 1, 2, 3, 4 ]
const secondHalf = wholeArray.subarray(-5);
console.log(wholeArray);    // Uint8Array [ 100, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(secondHalf);    // Uint8Array [ 5, 6, 7, 8, 9 ]
secondHalf[1] = 60;
console.log(wholeArray);    // Uint8Array [ 100, 1, 2, 3, 4, 5, 60, 7, 8, 9 ]
console.log(secondHalf);    // Uint8Array [ 5, 60, 7, 8, 9 ]
