var B = require("boots-utils");

var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./presets/preset-loader");

var extend          = B.extend,
    isArray         = require("boots-utils").array.isArray,
    forEach         = [].forEach;

var Animation = require("./animation"),
    Animator = require("./animator"),
    AnimationCollection = require("./animation-collection");

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
        result = new AnimationCollection();

    result.animations = [];
    optionsArray.forEach(function(options) {
        var o = extend({}, defaults, options),
            start = new Animator(),
            end = new Animator();

        end.translate(o.translateX, o.translateY, 0)
            .transitionDuration(o.transitionDuration)
            .transitionFunction(o.transitionFunction)
            .transitionProperty("all");

        result.add(new Animation([start, end], o));
    });

    forEach.call(document.querySelectorAll(selector), function(elt) {
        elt.addEventListener("click", function(e) {
            var x = e.clientX,
                y = e.clientY;
            console.log(x, y);
            result.animate(elt, x, y);
        });
    });

    return result;
}


SuperHearts.registerPreset = function(name, presetDefaults) {

    SuperHearts[name] = function() {
        var args         = argumentsHelper.apply(null, arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray,
            result = new AnimationCollection();

        if (!isArray(presetDefaults)) presetDefaults = [presetDefaults]; // TODO- get rid of this assumption (that not-arry implies object)

        var copy = presetDefaults.map(function(p) { return extend({}, p); });

        optionsArray.forEach(function(o) {
            copy.forEach(function(c) {
                extend(c, o);
            });
        });

        SuperHearts.apply(this, [selector].concat(copy));

    };
    return this;
};


loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;
module.exports = SuperHearts;