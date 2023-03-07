const array = [42, 67, 3, 23, 14];
array.sort((a, b) => {
    const aIsOdd = a % 2;
    const bIsOdd = b % 2;
    if (aIsOdd) {
        return bIsOdd ? a - b : -1;
    }
    return bIsOdd ? 1 : a - b;
});
console.log(array); // [3, 23, 67, 14, 42]
