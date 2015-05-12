module.exports = {
    randomAngle: function randomAngle() {
        return randomInRange.apply(null, arguments);
    },
    randomOpacity: function randomOpacity() {
        return randomInRange_hundreths.apply(null, arguments);
    },
    randomScalar: function randomScalar() {
        return randomInRange_hundreths.apply(null, arguments);
    },
    randomInRange: randomInRange,
};

function randomInRange() {
    var args = normalizeArguments(arguments),
        min  = args[0],
        max  = args[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange_hundreths() {
    var args = normalizeArguments(arguments),
        min  = args[0],
        max  = args[1];
    return randomInRange(min*100, max*100)/100;
}

function normalizeArguments(args) {

    args = [].slice.call(args);
    var result = [],
        head   = args[0];

    if (!args.length) noArgumentError();

    // Case 1: Two numbers (hopefully), which we return as a Range
    if (args.length > 1) return args;

    // Case 2: Only one argument, and it's a number.
    if (typeof head === "number") {
        return [head, head];
    }

    // Case 3: Only one argument, and it's a Range (hopefully)
    return head;
}

function noArgumentError() {
    throw new Error("You supplied no arguments to a function that needed arguments. Check the call stack!");
}