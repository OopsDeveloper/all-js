const PNG_HEADER_1 = 0x89504E47; // Big-endian first Uint32 of PNG header
const PNG_HEADER_2 = 0x0D0A1A0A; // Big-endian second Uint32 of PNG header
const TYPE_IHDR = 0x49484452;    // Big-endian type of IHDR chunk
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
            const dv = new DataView(fr.result);
            if (dv.byteLength >= 24 &&
                dv.getUint32(0) === PNG_HEADER_1 &&
                dv.getUint32(4) === PNG_HEADER_2 &&
                dv.getUint32(12) === TYPE_IHDR) {
                const width = dv.getUint32(16);
                const height = dv.getUint32(20);
                show(`${file.name} is ${width} by ${height} pixels`);
            } else {
                show(`${file.name} is not a PNG file.`);
            }
        };
        fr.onerror = error => {
            show(`File read failed: ${error}`);
        };
    }
);
