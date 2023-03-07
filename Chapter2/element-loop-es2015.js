const list = document.querySelectorAll("div.foo");
for (let n = 0; n < list.length; ++n) {
    const element = list[n];
    const text = element.classList.contains("bar") ? " [bar]" : "[not bar]";
    element.appendChild(document.createTextNode(text));
}
