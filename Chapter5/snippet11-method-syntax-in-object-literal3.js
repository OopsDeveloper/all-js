const s = "ple";
const obj = {
    "biz-baz"() {       // String literal method name
        console.log("Ran biz-baz");
    },
    ["exam" + s]() {    // Computed method name
        console.log("Ran example");
    }
};
obj["biz-baz"]();   // "Ran biz-baz"
obj.example();      // "Ran example"
