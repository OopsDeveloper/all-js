"use strict";
var Color = function Color(r, g, b) {
    if (!(this instanceof Color)) {
        throw new TypeError(
            "Class constructor Color cannot be invoked without 'new'"
        );
    }
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
};

Object.defineProperty(Color.prototype, "rgb", {
    get: function() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    },
    set: function(value) {
        var s = String(value);
        var match = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.exec(
            s.replace(/\s/g, "")
        );
        if (!match) {
            throw new Error("Invalid rgb color string '" + s + "'");
        }
        this.r = parseInt(match[1], 10);
        this.g = parseInt(match[2], 10);
        this.b = parseInt(match[3], 10);
    },
    configurable: true
});

Color.prototype.toString = function() {
    return this.rgb;
};
Color.fromCSS = function(css) {
    var match = /^#?([0-9a-f]{3}|[0-9a-f]{6});?$/i.exec(css);
    if (!match) {
        throw new Error("Invalid CSS code: " + css);
    }
    var vals = match[1];
    if (vals.length === 3) {
        vals = vals[0] + vals[0] + vals[1] + vals[1] + vals[2] + vals[2];
    }
    return new this(
        parseInt(vals.substring(0, 2), 16),
        parseInt(vals.substring(2, 4), 16),
        parseInt(vals.substring(4, 6), 16)
    );
};

// Usage
var c = new Color(30, 144, 255);
console.log(String(c));           // "rgb(30, 144, 255)"
c = Color.fromCSS("00A");
console.log(String(c));           // "rgb(0, 0, 170)"
