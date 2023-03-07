// ==== Prep for the snippet:

function escapeHTML(str) {
    // WARNING: This is only valid when the result is used in the *body* of
    // a tag, NOT when it's used in an *attribute value*.
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
function show(...msgs) {
    console.log(...msgs);
}

// ====  The snippet:

const a = ["text", "from", "users"];
const lbl = "Label from user";
show(`<div>${escapeHTML(`${lbl}: ${a.join()}`)}</div>`);
