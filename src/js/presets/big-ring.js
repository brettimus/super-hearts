var extend = require("boots-utils").extend,
    range = require("boots-utils").array.range,
    angles = range(0, 360, 20),
    base = {
        count: 1,
        scalar: .2,
        transitionDuration: 4200,
        translateY: -140/.2,
        translatZ: -20,
    },
    result = [];

angles.forEach(function(a) {
    result.push(extend({}, base, {rotate: a}));
});

module.exports = result;
