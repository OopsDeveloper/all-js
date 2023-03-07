const a = [, "x", , , "y"];
for (const index of a.keys()) {
    console.log(index, index in a ? "present" : "absent");
}
// =>
// 0 "absent"
// 1 "present"
// 2 "absent"
// 3 "absent"
// 4 "present"
