// TODO - move this to its own directory
var DEFAULTS = require("./defaults"),
    argumentsHelper = require("./arguments-helper");

var extend = require("./utilities").extend;

module.exports = function loadPresets(SuperHearts) { // is this a confusing or consistent parameter name?

    function presetHandler(presetDefaults) {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // TODO - test this?
        //        We are merging user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    }

    SuperHearts.Line = function Line() {
        return presetHandler(DEFAULTS.line);
    };

    SuperHearts.Geyser = function Geyser() {
        return presetHandler(DEFAULTS.geyser);
    };
};