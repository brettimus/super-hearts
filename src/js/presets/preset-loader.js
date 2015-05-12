// TODO
// loop through all files in sub-dir, add them programmatically
var circleDefaults  = require("./circle"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser"),
    argumentsHelper = require("../arguments-helper"),
    extend          = require("../utilities/extend");

module.exports = function loadPresets(SuperHearts) { // is this a confusing or consistent parameter name?

    function presetHandler(presetDefaults, originalArgs) {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // Merge user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        var normalizedArgs = [selector].concat(optionsArray);
        console.log("normalized args", normalizedArgs);
        return SuperHearts.apply(SuperHearts, normalizedArgs);
    }

    SuperHearts.Circle = function Circle() {
        return presetHandler(circleDefaults, arguments);
    };

    SuperHearts.Line = function Line() {
        return presetHandler(lineDefaults, arguments);
    };

    SuperHearts.Geyser = function Geyser() {
        return presetHandler(geyserDefaults, arguments);
    };
};