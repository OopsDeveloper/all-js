import { log } from "./dynamic-mod-log.js";

log("showtime module evaluated");
function nn(n) {
    return String(n).padStart(2, "0");
}
export function showTime() {
    const now = new Date();
    log(`Time is ${nn(now.getHours())}:${nn(now.getMinutes())}`);
}
