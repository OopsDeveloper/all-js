const array = [42, 67, 3, 23, 14];
array.sort((a, b) =>
    a % 2 ? b % 2 ? a - b : -1 : b % 2 ? 1 : a - b
);
console.log(array); // [3, 23, 67, 14, 42]
