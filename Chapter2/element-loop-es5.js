var list, n, element, text;
list = document.querySelectorAll("div.foo");
for (n = 0; n < list.length; ++n) {
    element = list[n];
    text = element.classList.contains("bar") ? " [bar]" : "[not bar]";
    element.appendChild(document.createTextNode(text));
}
