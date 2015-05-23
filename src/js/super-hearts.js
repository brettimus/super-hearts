var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./presets/preset-loader");
var animationCollectionFactory = require("./prototypes/animation-collection/animation-collection-factory");

var argumentsHelper = require("./arguments-helper"),
    extend          = require("./utilities/extend");

function SuperHearts() {
    var args         = argumentsHelper.apply(null, arguments),
        selector     = args.selector,
        optionsArray = args.optionsArray;

    // TODO
    // cache results of calls to SuperHearts
    // coud use an object whose keys are selectors!
    var result = animationCollectionFactory(selector);

    optionsArray.forEach(function(options) {
        result.addAnimation(options);
    });

    return result;
}
SuperHearts.registerPreset = function registerPreset(name, presetDefaults) {
    SuperHearts[name] = function() {
        var args         = argumentsHelper.apply(null, arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // Merge user options _after_ preset defaults so they can still override the defaults of a given preset
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    };
};

loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;