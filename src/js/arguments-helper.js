module.exports = function argumentsHelper() {
    var args = [].slice.call(arguments),
        result = {
            selector: "body",
            optionsArray: [],
        };
    if (typeof args[0] === "string") {
        result.selector = args[0];
        result.optionsArray = args.slice(1);
    }
    else {
        result.optionsArray = args.slice(0);
    }

    // hack
    if (result.optionsArray.length === 0) {
        result.optionsArray.push({});
    }

    return result;
};