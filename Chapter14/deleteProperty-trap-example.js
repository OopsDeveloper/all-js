const obj = {value: 42};
const p = new Proxy(obj, {
    deleteProperty(target, propName, descriptor) {
        if (propName === "value") {
            return false;
        }
        return Reflect.deleteProperty(target, propName, descriptor);
    }
});
console.log(`p.value = ${p.value}`);
console.log("deleting 'value' from p in loose mode:");
console.log(delete p.value); // false
(() => {
    "use strict";
    console.log("deleting 'value' from p in strict mode:");
    try {
        delete p.value;
    } catch (error) {
        // TypeError: 'deleteProperty' on proxy: trap returned
        // falsish for property 'value'
        console.error(error);
    }
})();
