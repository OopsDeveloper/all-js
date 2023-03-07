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
            // INCORRECT, Uint32Array uses architecture endianness,
            // this code will fail on a little-endian architecture
            if (fr.result.byteLength >= 24) {
                const data = new Uint32Array(fr.result, 0, 6);
                if (data[0] === PNG_HEADER_1 &&
                    data[1] === PNG_HEADER_2 &&
                    data[3].getUint32(12) === TYPE_IHDR) {
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
