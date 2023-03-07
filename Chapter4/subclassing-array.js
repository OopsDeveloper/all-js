class Elements extends Array {
    select(source) {
        if (source) {
            if (typeof source === "string") {
                const list = document.querySelectorAll(source);
                list.forEach(element => this.push(element));
            } else {
                this.push(source);
            }
        }
        return this;
    }

    style(props) {
        this.forEach(element => {
            for (const name in props) {
                element.style[name] = props[name];
            }
        });
        return this;
    }
}

// Usage
new Elements()
    .select("div")
    .style({color: "green"})
    .slice(1)
    .style({border: "1px solid red"});
