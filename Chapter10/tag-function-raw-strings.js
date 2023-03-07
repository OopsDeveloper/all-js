function example(template) {
    const first = template.raw[0];
    console.log(first);
    console.log(first.length);
    console.log(first[0]);
}
example`\u000A\x0a\n`;
