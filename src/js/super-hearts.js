// TODO
// - allow blur config
// - cache existing animations
// - 'noise' option for initial coords
// - use querySelectorAll

var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./presets/preset-loader");
var animationCollectionFactory = require("./factories/animation-collection-factory");

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

loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;

/* All the ways you can call SuperHearts */
/* SuperHearts() */
/* SuperHearts(options) */
/* SuperHearts(options1, options2, ...) */
/* SuperHearts(selector) */
/* SuperHearts(selector, options) */
/* SuperHearts(selector, options1, options2, ...) */
/* */
/* aaaand SuperHearts.PRESET */