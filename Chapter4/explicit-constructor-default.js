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

class Sub extends Base {
}

class SubSub1 extends Sub {
}

class SubSub2 extends Sub {
    static get [Symbol.species]() {
        return null;
    }
}

const x = new SubSub1(1).clone();
console.log(x.constructor.name); // "SubSub1"

const y = new SubSub2(2).clone();
console.log(y.constructor.name); // "Base", not "SubSub2" or "Sub"
