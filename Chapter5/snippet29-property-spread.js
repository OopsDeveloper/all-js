// ==== Prep for the snippet:

const defaultOptions = {
    title: "Default title",
    text: "Default text"
};

// ==== The snippet:

function showDialog(opts) {
    const options = {...defaultOptions, ...opts};
    console.log("title = '" + options.title + "', text = '" + options.text + "'");
}

// ==== Not in the snippet, but so you can see it in action:

showDialog({});
// => "title = 'Default title', text = 'Default text'"
showDialog({title: "Given title"});
// => "title = 'Given title', text = 'Default text'"
showDialog({title: "Given title", text: "Given text"});
// => "title = 'Given title', text = 'Given text'"
showDialog({text: "Given text"});
// => "title = 'Default title', text = 'Given text'"
