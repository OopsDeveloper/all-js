;(function() {
    if (Object.defineProperty) {
        var iterator = typeof Symbol !== "undefined" &&
                    Symbol.iterator &&
                    Array.prototype[Symbol.iterator];
        var forEach = Array.prototype.forEach;
        var update = function(collection) {
            var proto = collection && collection.prototype;
            if (proto) {
                if (iterator && !proto[Symbol.iterator]) {
                    Object.defineProperty(proto, Symbol.iterator, {
                        value: iterator,
                        writable: true,
                        configurable: true
                    });
                }
                if (forEach && !proto.forEach) {
                    Object.defineProperty(proto, "forEach", {
                        value: forEach,
                        writable: true,
                        configurable: true
                    });
                }
            }
        };

        if (typeof NodeList !== "undefined") {
            update(NodeList);
        }
        if (typeof HTMLCollection !== "undefined") {
            update(HTMLCollection);
        }
    }
})();
