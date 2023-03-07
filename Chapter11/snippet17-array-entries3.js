const a = [, undefined, , , "y"];
for (const [index, value] of a.entries()) {
    console.log(index, value, index in a ? "present" : "absent");
}
// =>
// 0 undefined "absent"
// 1 undefined "present"
// 2 undefined "absent"
// 3 undefined "absent"
// 4 "y" "present"