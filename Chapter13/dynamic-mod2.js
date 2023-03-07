import { log } from "./dynamic-mod-log.js";
import { showTime } from "./dynamic-mod-showtime.js";

log("dynamic module number 2 evaluated");
export function example(logFromEntry) {
    log("Meh, being Number 2 isn't that bad");
    log(`log === logFromEntry? ${log === logFromEntry}`);
    showTime();
}
