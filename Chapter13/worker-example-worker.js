import { example } from "./worker-example-mod.js";

postMessage(`example(4) = ${example(4)}`);
