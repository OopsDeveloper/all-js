function getMinMax(nums) {
    let min, max;
    // In a later chapter you'll learn about the `for-of` loop, which would
    // probably be the preferred choice here
    min = Infinity;
    max = -Infinity;
    for (let n = 0; n < nums.length; ++n) {
        const num = nums[n];
        if (min > num) {
            min = num;
        }
        if (max < num) {
            max = num;
        }
    }
    return {min, max} ;
}

console.log(getMinMax([8, 14, 3, 27, 12])); // {min: 3, max: 27}
