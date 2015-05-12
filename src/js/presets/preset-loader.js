var buttonDefaults  = require("./button"),
    circleDefaults  = require("./circle"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser"),
    argumentsHelper = require("../arguments-helper"),
    extend          = require("../utilities/extend");

module.exports = function loadPresets(SuperHearts) { // is this a confusing or consistent parameter name?

    function presetHandler(presetDefaults, originalArgs) {
        var args         = argumentsHelper.apply(null, originalArgs),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // Merge user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    }

    SuperHearts.Button = function Button() {
        return presetHandler(buttonDefaults, arguments);
    };

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

