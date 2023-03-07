export function log(msg) {
    const p = document.createElement("pre");
    p.appendChild(document.createTextNode(msg));
    document.body.appendChild(p);
}
export function stamplog(msg) {
    return log(`${new Date().toISOString()}: ${msg}`);
}
