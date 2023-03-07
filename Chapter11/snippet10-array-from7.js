function rangeArray(start, end, step = 1) {
    return Array.from(
        {length: Math.floor(Math.abs(end - start) / Math.abs(step))},
        (_, i) => start + (i * step)
    );
}
console.log(rangeArray(0, 5));      // [0, 1, 2, 3, 4]
console.log(rangeArray(6, 11));     // [6, 7, 8, 9, 10]
console.log(rangeArray(10, 20, 2)); // [10, 12, 14, 16, 18]
console.log(rangeArray(4, -1, -1)); // [4, 3, 2, 1, 0]
