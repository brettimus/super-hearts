var B = require("boots-utils");

var argumentsHelper = require("./arguments-helper");
var loadPresets = require("./presets/preset-loader");

var extend          = B.extend,
    isArray         = require("boots-utils").array.isArray,
    forEach         = [].forEach;

var Image = require("./image"),
    Animation = require("./animation"),
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

    // Add Event Listeners
    forEach.call(document.querySelectorAll(selector), function(elt) {
        elt.addEventListener("click", function(e) {
            var x = e.clientX,
                y = e.clientY;
            result.animate(elt, x, y);
        });
        elt.addEventListener("touchend", function(e) {
            var x = e.changedTouches[0].clientX,
                y = e.changedTouches[0].clientY;
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


SuperHearts.select = function(selector) {
    return {
        count: function(n) {
            var selection = document.querySelector(selector);
            return count.bind(SuperHearts, selection)(n);
        },
    };
};



function count(selection, n) {
    var a = new Animation([], {count: n});

    a.start = new Animator();
    a.cancel = cancel.bind(this);
    a.done = done.bind(this);
    a.then = then.bind(this);

    return a;

    function cancel() {
        a = null;
        this._head = null;
        return this;
    }

    function done() {
        var elt = selection,
            head = this._head,
            _this = this;

        B.nTimes(a.count.get(), function() {
            var img = new Image(elt, "", {});
            img.style(_this._head.print())
                .show();
            window.requestAnimationFrame(function() {
                if (!_this._head.next) return;
                var styles = _this._head.next.printNonTransforms(),
                    transforms = _this._head.next._compileTransforms();

                img.style(styles).transform(transforms);
            });
        });
    }

    function then() {
        if (!this._head)
            this._head = a.start;

        var result = new Animator();

        var curr = this._head;
        while (curr.next) curr = curr.next;

        curr.next = result;
        result.then = then.bind(this);
        result.done = done.bind(this);
        result.cancel = cancel.bind(this);
        return result;
    }
}



loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;
module.exports = SuperHearts;