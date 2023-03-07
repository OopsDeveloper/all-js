const createRegex = (template, ...values) => {
    // Build the source from the raw text segments and values
    // (in a later section, you'll see something that can replace
    // this reduce call)
    const source = template.raw.reduce(
        (acc, str, index) => acc + values[index - 1] + str
    );
    // Check it's in /expr/flags form
    const match = /^\/(.+)\/([a-z]*)$/.exec(source);
    if (!match) {
        throw new Error("Invalid regular expression");
    }
    // Get the expression and flags, create
    const [, expr, flags = ""] = match;
    return new RegExp(expr, flags);
};

// From the TC39 proposal: https://github.com/benjamingr/RegExp.escape
const escapeRegExp = s => String(s).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");

const alternatives = ["this", "that", "the other"];
const rex = createRegex`/\b(?:${alternatives.map(escapeRegExp).join("|")})\b/i`;

const test = (str, expect) => {
    const result = rex.test(str);
    console.log(str + ":", result, "=>", !result == !expect ? "Good" : "ERROR");
};
test("doesn't have either", false);
test("has_this_but_not_delimited", false);
test("has this ", true);
test("has the other ", true);
