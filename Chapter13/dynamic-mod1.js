import { log } from "./dynamic-mod-log.js";
import { showTime } from "./dynamic-mod-showtime.js";

log("dynamic module number 1 evaluated");
export function example(logFromEntry) {
    log("Number 1! Number 1! Number 1!");
    log(`log === logFromEntry? ${log === logFromEntry}`);
    showTime();
}
