var extend = require("boots-utils").extend,
    base = {
        count: 1,
        imageHeight: 88,
        imageWidth: 100,
        scalar: 0.4,
        translateY: 100,
    },
    n = extend({}, base, {rotate: 0, color: "#A30015"}),
    e = extend({}, base, {rotate: 90, color: "#73BA9B"}),
    s = extend({}, base, {rotate: 180, color: "#258EA6"}),
    w = extend({}, base, {rotate: 270, color: "#493548"});

module.exports = [n, e, s, w];