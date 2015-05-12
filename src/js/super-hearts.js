// TODO
// - allow blur config
// - cache existing animations
// - let user specify numbers & arrays for options
// - 'noise' option for initial coords
// - rename configs

var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./preset-loader");
var animationCollectionFactory = require("./factories/animation-collection-factory");


// TODO - provide interface for clicking an icon... we want to spew hearts from a consistent spot

function SuperHearts() {
    var args         = argumentsHelper(arguments),
        selector     = args.selector,
        optionsArray = args.optionsArray;


    // TODO
    // cache results of calls to SuperHearts
    // coud use an object whose keys are selectors!
    var result = animationCollectionFactory(selector);

    // hack
    if (optionsArray.length === 0) optionsArray.push({});
    optionsArray.forEach(function(options) {
        result.addAnimation(options);
    });

    return result;
}

loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;



/* All the ways you can call SuperHearts */
/* SuperHearts() */
/* SuperHearts(selector) */
/* SuperHearts(options) */
/* SuperHearts(options1, options2, ...) */
/* SuperHearts(selector, options) */
/* SuperHearts(selector, options1, options2, ...) */
/* */
/* aaaand SuperHearts.PRESET */