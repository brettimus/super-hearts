var B = require("boots-utils");

var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./presets/preset-loader");
var animationCollectionFactory = require("./prototypes/animation-collection/animation-collection-factory");

var argumentsHelper = require("./arguments-helper"),
    extend          = require("./utilities/extend"),
    isArray         = require("boots-utils").array.isArray,
    forEach         = [].forEach;

var Range = require("./range"),
    Animation = require("./animation"),
    Animator = require("./animator"),
    HeartImage = require("./heart-image");

var defaults = require("./default");

/**
 * TODO - inject ranges here?
 * Returns an animation object 
 * @constructor
 */
function SuperHearts() {
    var args         = argumentsHelper.apply(null, arguments),
        selector     = args.selector,
        optionsArray = args.optionsArray,
        result = {};

    result.animations = [];
    optionsArray.forEach(function(options) {
        var o = extend({}, defaults, options),
            start = new Animator(),
            end = new Animator();


        end.translate(o.translateX, o.translateY, 0)
            .transitionDuration(o.transitionDuration)
            .transitionFunction(o.transitionFunction)
            .transitionProperty("all");
        console.log("BASE END", end);

        result.animations.push(new Animation(start, end, o));
    });

    forEach.call(document.querySelectorAll(selector), function(elt) {
        console.log(elt);
        elt.addEventListener("click", function(e) {
            var x = e.clientX,
                y = e.clientY;

            result.animations.forEach(function(a) {

                B.nTimes(a.count.get(), function() {
                    var start = new Animator();
                    var o = a.options;
                    start.clear();
                    start
                        .position("fixed")
                        .x(0)
                        .y(0)
                        .transformOrigin("center center")
                        .translate(x-50, y-50)
                        .opacity(o.opacity)
                        .rotate(o.angle)
                        .scale(o.scalar);

                    var img = new HeartImage(elt, start.print(), a.options);
                        img.show();
                        window.requestAnimationFrame(function() {
                            console.log("INIT: ", img);
                            console.log("INIT STYLE: ", start.print());
                            console.log("STYLE TO ADD: ", a.end.printNonTransforms());
                            img.addStyle(a.end.printNonTransforms());
                            console.log("AFTER ADDED STYLES: ", img.image.style.cssText);

                            var apt = a.end._compileTransforms();
                            console.log("ADDING TRANS: ", apt);
                            img.addTransform(apt);
                            console.log("AFTER ADDING TRANS: ", img.image.style.cssText);
                            img.hide(function() {
                                img.remove(); // TODO use ontransition end in the hide function
                            });
                        });

                        // function() {
              
                        // });

                });
            });
        });
    });

    return result; // TODO - return new object...?
}

// SuperHearts.registerPreset = function registerPreset(name, presetDefaults) {
//     SuperHearts[name] = function() {
//         var args         = argumentsHelper.apply(null, arguments),
//             selector     = args.selector,
//             optionsArray = args.optionsArray;

//         if (!isArray(presetDefaults)) {
//             presetDefaults = [presetDefaults];
//         }

//         if (presetDefaults.length > optionsArray.length) {
//             presetDefaults.forEach(function(preset, i) {
//                 optionsArray[i] = extend({}, preset, optionsArray[i]);
//             });
//         }
//         else {
//             // Merge user options _after_ preset defaults so they can still override the defaults of a given preset
//             optionsArray.forEach(function(options, i) {
//                 optionsArray[i] = extend({}, presetDefaults[i], options);
//             });
//         }

//         return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
//     };
// };




// loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;
module.exports = SuperHearts;