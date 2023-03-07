(async() => {
    try {
        const {log} = await import("./dynamic-mod-log.js");
        log("entry point module got log");
        const modName = `./dynamic-mod${Math.random() < 0.5 ? 1 : 2}.js`;
        log(`entry point module requesting ${modName}`);
        const mod = await import(modName);
        log(`entry point module got module ${modName}, calling mod.example`);
        mod.example(log);
    } catch (error) {
        console.error(error);
    }
})();
