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
}

// Start with dark gray, full opacity
const ca = new ColorWithAlpha(169, 169, 169);
console.log(String(ca));                      // "rgba(169, 169, 169, 1)"
console.log(ca.brightness());                 // 169
// Make it half-transparent
ca.a = 0.5;
console.log(String(ca));                      // "rgba(169, 169, 169, 0.5)"
console.log(ca.brightness());                 // 84.5
// Brightness when over a blue background
const blue = new ColorWithAlpha(0, 0, 255);
console.log(ca.brightness(blue));             // 63.774477345571015
