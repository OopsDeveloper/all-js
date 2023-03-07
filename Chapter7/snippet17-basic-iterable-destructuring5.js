const arr = [1, 2]
let first, second
console.log("ASI hazard")
[first, second] = arr // TypeError: Cannot set property 'undefined' of undefined
console.log(first, second)
