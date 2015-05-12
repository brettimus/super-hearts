module.exports = {
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