class Color {
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get rgb() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    set rgb(value) {
        // ...code shown later...
    }

    toString() {
        return this.rgb;
    }

    static fromCSS(css) {
        // ...code shown later...
    }
}

let c = new Color(30, 144, 255);
console.log(String(c));      // "rgb(30, 144, 255)"
c = Color.fromCSS("00A");
console.log(String(c));      // Shows "undefined" because the code for `fromCSS`
                             // isn't included in the above yet; when it is, this
                             // will show "rgb(0, 0, 170)" (see full-basic-class.js)
