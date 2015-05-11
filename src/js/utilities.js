module.exports = {
    square: function square(x) {
        return x*x;
    },
    toRadians: function toRadians(theta) {
        while (theta < 0) { theta += 360; }
        return (theta % 360)*(Math.PI / 180);
    },
    randomAngle: function randomAngle(a, b) {
        return randomInRange(a, b);
    },
    randomOpacity: function randomOpacity(a, b) {
        return randomInRange(a*100, b*100)/100;
    },
    randomScalar: function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*100, b*100)/100;
    },
    randomInRange: randomInRange,
    extend: function extend() {
        // extends an arbitrary number of objects
        var args   = [].slice.call(arguments, 0),
            result = args[0];

        for (var i=1; i < args.length; i++) {
            result = extendHelper(result, args[i]);
        }

        return result;
    },
};

// TODO - clean this up
function randomInRange(a, b) {
    var args = [].slice.call(arguments);
    if (args.length === 1) {
        if (args[0].length < 2) throw new Error("a range array must have two values");
        a = args[0][0];
        b = args[0][1];
    }
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function extendHelper(destination, source) {
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}