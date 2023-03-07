class Elements extends Array {
    constructor(arg0, ...rest) {
        const firstType = rest.length === 0 && typeof arg0;
        if (firstType === "number") {
            super(arg0);
        } else if (firstType === "string") {
            super(...document.querySelectorAll(arg0));
        } else {
            super(arg0, ...rest);
        }
    }

    style(props) {
        for (const element of this) {
            for (const [name, value] of Object.entries(props)) {
                element.style[name] = value;
            }
        }
        return this;
    }
}

// Usage
new Elements("div")
    .style({color: "green"})
    .slice(1)
    .style({border: "1px solid red"});
