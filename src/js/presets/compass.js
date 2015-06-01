var extend = require("boots-utils").extend,
    base = {
        count: 1,
        imageHeight: 88,
        imageWidth: 100,
        scalar: 0.4,
        translateY: 100,
    },
    n = extend({}, base, {angle: 0}),
    e = extend({}, base, {angle: 90, color: "darkgreen"}),
    s = extend({}, base, {angle: 180, color: "blue"}),
    w = extend({}, base, {angle: 270, color: "purple"});

module.exports = [n, e, s, w];