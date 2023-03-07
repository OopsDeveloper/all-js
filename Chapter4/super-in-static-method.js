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
        let s = String(value);
        let match = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.exec(
            s.replace(/\s/g, "")
        );
        if (!match) {
            throw new Error("Invalid rgb color string '" + s + "'");
        }
        this.r = parseInt(match[1], 10);
        this.g = parseInt(match[2], 10);
        this.b = parseInt(match[3], 10);
    }

    toString() {
        return this.rgb;
    }

    brightness() {
        return Math.sqrt(
            (this.r * this.r * 0.299) +
            (this.g * this.g * 0.587) +
            (this.b * this.b * 0.114)
        );
    }

    static fromCSS(css) {
        const match = /^#?([0-9a-f]{3}|[0-9a-f]{6});?$/i.exec(css);
        if (!match) {
            throw new Error("Invalid CSS code: " + css);
        }
        let vals = match[1];
        if (vals.length === 3) {
            vals = vals[0] + vals[0] + vals[1] + vals[1] + vals[2] + vals[2];
        }
        return new this(
            parseInt(vals.substring(0, 2), 16),
            parseInt(vals.substring(2, 4), 16),
            parseInt(vals.substring(4, 6), 16)
        );
    }
}

class ColorWithAlpha extends Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        super(r, g, b);
        this.a = a;
    }

    brightness(bgColor) {
        let result = super.brightness() * this.a;
        if (bgColor && this.a !== 1) {
            result = (result + (bgColor.brightness() * (1 - this.a))) / 2;
        }
        return result;
    }

    toString() {
        return "rgba(" + this.r + ", " +
                         this.g + ", " +
                         this.b + ", " +
                         this.a + ")";
    }

    static fromCSS(css, a = 1) {
        const result = super.fromCSS(css);
        result.a = a;
        return result;
    }
}

const ca = ColorWithAlpha.fromCSS("#1E90FF", 0.5);
console.log(String(ca));                      // "rgba(30, 144, 255, 0.5)"
