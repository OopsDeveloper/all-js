class Base {
    constructor() {
        console.log(new.target.name);
    }
}

new Base(); // "Base"
