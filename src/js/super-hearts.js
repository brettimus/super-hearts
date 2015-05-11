// TODO
// - allow blur config
// - cache existing animations
// - let user specify numbers + arrays for options
// - rename configs

var defaults = require("./defaults");

var heartIconFactory = require("./icon-factory"); // todo

var heartProto = require("./heart-prototype");

// TODO
// switch to only using utils module...
var utils         = require("./utilities"),
    randomInRange = utils.randomInRange,
    extend        = utils.extend;


function argumentsHelper() {
    var args = [].slice.call(arguments[0]), // NB this call to `arguments[0]` is weird but i like being able to pass in another function's args
        result = {
            selector: "body",
            optionsArray: [],
        };

    if (typeof args[0] === "string") {
        result.selector = args[0];
        result.optionsArray = args.slice(1);
    }
    else {
        result.optionsArray = args.slice(0);
    }
    return result;
}

global.SuperHearts = (function() {

    // var DEFAULTS = defaults.circle;

    var mainDefault =  defaults.circle;

    function initialize(selector, options) {
        var elt       = document.querySelector(selector),
            config    = extend({}, heartProto, mainDefault, options),
            eltRect   = elt.getBoundingClientRect(),
            geyserX   = eltRect.left + ((eltRect.width) / 2),
            geyserY   = eltRect.top + (eltRect.height / 2);

        // TODO put this somewhere else... this is sloppy
        if (!config.imageSrc) {
            config.imageSrc = heartIconFactory({
                fill: config.heartColor,
            });
        }

        if (config.geyser) {
            geyser();
        }
        else {
            elt.addEventListener("click", onclick);
            elt.addEventListener("touchend", ontouch);
        }

        function heartFactory(x, y) {
            return Object.create(config).setCoordinates(x, y).setImage();
        }

        function heartSpewer(x,y) {
            return function() {
                heartFactory(x, y).show().animate();
            };
        }

        function spewHearts(x,y) {
            var count = randomInRange(config.heartsCount);
            for (var i = 0; i < count; i++) {
                window.requestAnimationFrame(heartSpewer(x, y));
            }
        }

        function onclick(e) {
            var x = e.pageX,
                y = e.pageY;
            spewHearts(x, y);
        }

        function ontouch(e) {
            var x = e.changedTouches[0].pageX,
                y = e.changedTouches[0].pageY;
            spewHearts(x, y);
        }

        function geyser() {
            console.log(eltRect);
            config.geyserInterval = config.geyserInterval || config.transitionDuration/2;
            setInterval(function(){
                spewHearts(geyserX, geyserY);
            }, config.geyserInterval);
        }
    }

    /* All the ways you can call this function */
    /* SuperHearts() */
    /* SuperHearts(selector) */
    /* SuperHearts(options) */
    /* SuperHearts(options1, options2, ...) */
    /* SuperHearts(selector, options) */
    /* SuperHearts(selector, options1, options2, ...) */
    /* aaaand SuperHearts.PRESET */
    function result() {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // TODO
        // refactor. this is ugly
        if (optionsArray.length > 0) {
            optionsArray.forEach(function(options) {
                initialize(selector, options);
            });
        } else {
            initialize(selector, {});
        }


        return {
            compose: function compose(options) {
                initialize(selector, options);
                return this;
            }
        };
    }

    function presetHandler(presetDefaults) {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // TODO - test this?
        //        We are merging user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return result.apply(result, [selector].concat(optionsArray));
    }

    result.Line = function Line() {
        var lineDefaults = {
                rotateHearts: false,
                transitionDuration: 650,
                translateXRange: [-60, 60]
            };

        return presetHandler(lineDefaults);
    };

    result.Geyser = function Geyser() {
        var geyserDefaults = {
                angleRange: [-10, 10],
                geyser: true,
                geyserInterval: 200,
                heartsCount: [1,1],
                opacityRange: [0.3, 0.6],
                scalarRange: [0.20, 0.25],
                transitionDuration: 800,
                translateXRange: [-45, 45],
                translateYRange: [30, 60]
            };

        return presetHandler(geyserDefaults);
    };

    return result;
})();