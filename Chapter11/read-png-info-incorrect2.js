const PNG_HEADER = Uint8Array.of(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);
const TYPE_IHDR = Uint8Array.of(0x49, 0x48, 0x44, 0x52);
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
            // INCORRECT, Uint32Array uses architecture endianness,
            // this code will fail on a little-endian architecture
            if (fr.result.byteLength >= 24) {
                const bytes = new Uint8Array(fr.result, 0, 16);
                const data = new Uint32Array(fr.result, 0, 6);
                if (PNG_HEADER.every((b, i) => b === bytes[i]) &&
                    TYPE_IHDR.every((b, i) =>  b === bytes[i + 12])) {
                    const width = data[4];
                    const height = data[5];
                    show(`${file.name} is ${width} by ${height} pixels`);
                    return;
                }
            }
            show(`${file.name} is not a PNG file.`);
        };
        fr.onerror = error => {
            show(`File read failed: ${error}`);
        };
    }
);
