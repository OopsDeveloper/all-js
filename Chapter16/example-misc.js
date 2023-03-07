let logging = true;
export function log(id, message) {
    if (logging) {
        console.log(String(id).padEnd(10, " "), message);
    }
}
export function setLogging(flag) {
    logging = flag;
}
