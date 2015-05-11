// TODO - move this to its own directory
var DEFAULTS = require("./defaults"),
    argumentsHelper = require("./arguments-helper");

var extend = require("./utilities").extend;

module.exports = function loadPresets(SuperHearts) { // is this a confusing or consistent parameter name?

    function presetHandler(presetDefaults, originalArgs) {
        var args         = argumentsHelper(originalArgs),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // Merge user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    }

    SuperHearts.Line = function Line() {
        return presetHandler(DEFAULTS.line, arguments);
    };

    SuperHearts.Geyser = function Geyser() {
        return presetHandler(DEFAULTS.geyser, arguments);
    };
};