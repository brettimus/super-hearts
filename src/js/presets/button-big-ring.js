var extend = require("boots-utils").extend,
    range = require("boots-utils").array.range,
    angles = range(0, 360, 20),
    base = {
        count: 1,
        fixed: true,
        scalar: [0.18, 0.22],
        transitionDuration: 2400,
        translateY: 140,
    },
    result = [];

angles.forEach(function(a) {
    result.push(extend({}, base, {angle: a}));
});

module.exports = result;
