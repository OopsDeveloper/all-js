const PNG_HEADER = Uint8Array.of(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);
function isPNG(byteData) {
    return byteData.length >= PNG_HEADER.length &&
           PNG_HEADER.every((b, i) => b === byteData[i]);
}
function show(msg) {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(msg));
    document.body.appendChild(p);
}
document.getElementById("file-input").addEventListener(
    "change",
    function(event) {
        const file = this.files[0];
        if (!file) {
            return;
        }
        const fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.onload = () => {
            const byteData = new Uint8Array(fr.result);
            show(`${file.name} ${isPNG(byteData) ? "is" : "is not"} a PNG file.`);
        };
        fr.onerror = error => {
            show(`File read failed: ${error}`);
        };
    }
);
