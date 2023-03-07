class Base {
    constructor(data) {
        this.data = data;
    }

    static get [Symbol.species]() {
        return this;
    }

    static create(data) {
        // Doesn't use `Symbol.species`
        const ctor = this || Base;
        return new ctor(data);
    }

    clone() {
        // Uses `Symbol.species`
        const ctor = this && this.constructor &&
                     this.constructor[Symbol.species] || Base;
        return new ctor(this.data);
    }
}

// Sub1 uses the default behavior, which is often what you want
class Sub1 extends Base {
}

// Sub2 makes any method that respects the pattern use Base instead of Sub2
class Sub2 extends Base {
    static get [Symbol.species]() {
        return Base;
    }
}

const a = Base.create(1);
console.log(a.constructor.name);        // "Base"
const aclone = a.clone();
console.log(aclone.constructor.name);   // "Base"

const b = Sub1.create(2);
console.log(b.constructor.name);        // "Sub1"
const bclone = b.clone();
console.log(bclone.constructor.name);   // "Sub1"

const c = Sub2.create(3);
console.log(c.constructor.name);        // "Sub2"
const d = new Sub2(4);
console.log(d.constructor.name);        // "Sub2"
console.log(d.data);                    // 4
const dclone = d.clone();
console.log(dclone.constructor.name);   // "Base"
console.log(dclone.data);               // 4
