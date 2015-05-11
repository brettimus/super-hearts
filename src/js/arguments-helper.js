// This is a `utility` but it deserves its own file...
module.exports = function argumentsHelper() {
    var args = [].slice.call(arguments[0]), // NB this call to `arguments[0]` is weird but i like being able to pass in another function's args
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

    if (result.optionsArray.length === 0) {
        result.optionsArray.push({});
    }

    return result;
};