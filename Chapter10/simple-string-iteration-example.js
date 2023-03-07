// Note: This file is encoded in UTF-8. Your system may or may not have a different default encoding.

for (const ch of ">😊<") {
    console.log(`${ch} (${ch.length})`);
}
// =>
// > (1)
// 😊 (2)
// < (1)

// If the above didn't produce the output shown above, it's likely an encoding problem.
// Try this version instead:
// for (const ch of ">\u{1F60A}<") {
//     console.log(`${ch} (${ch.length})`);
// }
