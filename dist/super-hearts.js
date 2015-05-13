(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function argumentsHelper() {
    var args = [].slice.call(arguments),
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

    // hack
    if (result.optionsArray.length === 0) {
        result.optionsArray.push({});
    }

    return result;
};
},{}],2:[function(require,module,exports){
// The "main" default is the Circle preset
module.exports = require("./presets/circle");
},{"./presets/circle":7}],3:[function(require,module,exports){
var animationCollectionProto = require("../prototypes/animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    var animationCollection = Object.create(animationCollectionProto).setSelector(selector).setElement(selector);
    animationCollection.animations = []; // NB - this is necessary to keep the collection's prototype from being modified by calls to `addAnimation`
    return animationCollection;
};
},{"../prototypes/animation-collection-prototype":11}],4:[function(require,module,exports){
// TODO - refactor dat factory
// the factory function does stuff it shouldn't be responsible for

var heartProto = require("../prototypes/heart-prototype"),
    animationProto = require("../prototypes/animation-prototype");

var mainDefault = require("../default"),
    extend = require("../utilities/extend");

module.exports = function animationFactory(selector, options) {
    // TODO
    // this shouldn't need to know `selector`
    // have animationCollection inject an `elt` corresponding to original anim?
    //
    var animation     = Object.create(animationProto),
        elt           = document.querySelector(selector),
        modHeartProto = extend({}, heartProto, mainDefault, options);

    if (elt === null) {
        console.log("No element matched the given selector: \""+selector+"\"");
        console.log("~i shall fail silently~");
        return;
    }

    animation.events = {
        click: null,
        touch: null,
    };
    animation.selector = selector;
    animation.modHeartProto = modHeartProto;


    // TODO
    // this is so wrong

    if (modHeartProto.geyser) {
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
        animation.geyser(elt);
    }
    else if (modHeartProto.fixed) {
        animation.events.click = animation.onclickFixed.bind(animation);
        elt.addEventListener("click", animation.events.click);
        animation.events.touchend = animation.ontouchFixed.bind(animation);
        elt.addEventListener("touchend", animation.events.touchend);
    }
    else {
        animation.events.click = animation.onclick.bind(animation);
        elt.addEventListener("click", animation.events.click);
        animation.events.touchend = animation.ontouch.bind(animation);
        elt.addEventListener("touchend", animation.events.touchend);
    }

    return animation;
};
},{"../default":2,"../prototypes/animation-prototype":12,"../prototypes/heart-prototype":13,"../utilities/extend":15}],5:[function(require,module,exports){
// TODO - construct this from actual SVG file (close!)
//      - look into using an SVG lib instead of xml2js
//
// var fs = require('fs'),
//     xml2js = require('xml2js'),
//     parser = new xml2js.Parser(),
//     builder = new xml2js.Builder();

// fs.readFile(__dirname + '/../icons/heart.svg', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//         console.dir(result.svg.path);
//         // inspect entire object
//         // console.log(util.inspect(result, false, null))
//         console.log('Done');
//         // TODO manipulate object's style...
//         // ...
//         // build object
//         var xml = builder.buildObject(obj);
//     });
// });

// original
// var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';
// module.exports = function(options) {
//     var fill = options.fill,
//         icon = SVG.replace("%FILL%", fill),
//         src = 'data:image/svg+xml;charset=utf-8,'+icon;
//     return src;
// };

// var heartString = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';

// var container = document.createElement("div");
// // container.style.visibility = "hidden";
// container.innerHTML = heartString;
// document.body.appendChild(container);

// var svg = document.querySelector("svg");
// var heart = document.querySelector("svg path");

// // `element` is the element you want to wrap
// var heartParent = heart.parentNode;
// var heartGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
// heartGroup.setAttributeNS("http://www.w3.org/2000/svg", "filter", "url(#blur)");
// // set the wrapper as child (instead of the element)
// heartParent.replaceChild(heartGroup, heart);
// // set element as child of wrapper
// heartGroup.appendChild(heart);

// var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
// svg.appendChild(filter);
// filter.setAttributeNS("http://www.w3.org/2000/svg", "id", "blur");

// var gBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
// filter.appendChild(gBlur);
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "in", "SourceGraphic");
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "stdDeviation", "2");
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "result", "blurry");

// var merge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
// filter.appendChild(merge);
// var mergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
// // var mergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
// // merge.appendChild(mergeNode2);
// merge.appendChild(mergeNode1);
// mergeNode1.setAttributeNS("http://www.w3.org/2000/svg", "in", "blurry");
// // mergeNode2.setAttributeNS("http://www.w3.org/2000/svg", "in", "SourceGraphic");


var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="%BLUR%" result="blurry" /><feMerge><feMergeNode in="SourceGraphic"></feMergeNode><feMergeNode in="blurry"></feMergeNode></feMerge></filter><g id="heart" style="filter:url(#blur); "><path style="fill: %FILL%; %STYLES%" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></g></svg>';
module.exports = function(options) {
    var fill = options.fill,
        blur = options.blur || 0,
        styles = options.styles || "",
        icon = SVG.replace("%FILL%", fill).replace("%BLUR%", blur).replace("%STYLES%", styles),
        src = 'data:image/svg+xml;charset=utf-8,'+icon;
    return src;
};
},{}],6:[function(require,module,exports){
module.exports = {
    angle: [0, 359],
    count: [6, 10],
    fixed: true,
    opacity: [0.10, 0.75],
    scalar: [0.15, 0.45],
    transitionDuration: 600,
    translateY: [15, 45],
};
},{}],7:[function(require,module,exports){
module.exports = {
    angle: [0, 359],
    blur: 0,
    doNotRemove: false,
    fan: false,
    floatingInSpace: false,
    geyser: false,
    count: [6, 10],
    color: "#B91319",
    imageSrc: undefined,
    opacity: [0.10, 0.75],
    rotate: true,
    scalar: [0.15, 0.45],
    transformOrigin: "center center",
    transitionDuration: 400,
    transitionFunction: "ease-out",
    translateX: [0, 0],
    translateY: [15, 45],
    xNoise: 0,
    yNoise: 0,
};
},{}],8:[function(require,module,exports){
module.exports = {
    angle: [-10, 10],
    geyser: true,
    geyserInterval: 200,
    count: [1,1],
    opacity: [0.3, 0.6],
    scalar: [0.20, 0.25],
    transitionDuration: 800,
    translateX: [-45, 45],
    translateY: [30, 60]
};
},{}],9:[function(require,module,exports){
module.exports = {
    rotate: false,
    transitionDuration: 650,
    translateX: [-60, 60]
};
},{}],10:[function(require,module,exports){
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


},{"../arguments-helper":1,"../utilities/extend":15,"./button":6,"./circle":7,"./geyser":8,"./line":9}],11:[function(require,module,exports){
var animationFactory = require("../factories/animation-factory");

module.exports = {
    animations: null, // Array (assigned on instance creation in factory function).
    element: null,    // will be frozen
    selector: null,   // will be frozen

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        this.animations.push(result);
        return this;
    },

    removeAnimation: function removeAnimation() {
        console.log("removeAnimation is _not yet implemented_");
        return this;
    },

    compose: function compose(options) {
        this.addAnimation(options);
        return this;
    },

    removeAll: function removeAll() {
        this.animations.forEach(function(animation, i, animations) {
            animation.remove(this.selector);
            animations[i] = null;
        }, this);
        this.animations = [];
        return this;
    },

    // TODO - store element instead of selector
    // Not in use
    setElement: function setElement(selector) {
        var value = document.querySelector(selector),
            description = {
                configurable: false,
                writable: false,
                value: value,
            };
        Object.defineProperty(this, "element", description);
        return this;
    },

    // NB Freezes selector
    setSelector: function setSelector(selector) {
        var description = {
            configurable: false,
            writable: false,
            value: selector,
        };
        Object.defineProperty(this, "selector", description);
        return this;
    },

};
},{"../factories/animation-factory":4}],12:[function(require,module,exports){
var randomInRange = require("../utilities/random").randomInRange;

module.exports = {

    count: null, // TODO - should store this here...
    events: null,
    modHeartProto: null,

    onclick: function onclick(e) {
        var x = e.pageX,
            y = e.pageY;
        this.spewHearts(x, y);
    },

    ontouch: function ontouch(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        this.spewHearts(x, y);
    },

    onclickFixed: function onclickFixed(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },

    ontouchFixed: function ontouchFixed(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },

    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName, i) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },

    spewHearts: function spewHearts(x,y) {
        var count = randomInRange(this.modHeartProto.count);
        for (var i = 0; i < count; i++) {
            window.requestAnimationFrame(this.heartSpewer(x, y).bind(this));
        }
    },

    heartFactory: function heartFactory(x, y) {
        return Object.create(this.modHeartProto).setCoordinates(x, y).setImage();
    },

    heartSpewer: function heartSpewer(x,y) {
        return function() {
            this.heartFactory(x, y).show().animate();
        };
    },

    // TODO - make a `geyserAnimation` prototype
    // * BUG - coordinates do not automagically correct on window resizing
    geyser: function geyser(elt) {
        var eltRect = elt.getBoundingClientRect(),
            geyserX = eltRect.left + ((eltRect.width) / 2),
            geyserY = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    }

};
},{"../utilities/random":17}],13:[function(require,module,exports){
var miscUtils      = require("../utilities/misc"),
    randUtils      = require("../utilities/random"),
    toRadians      = miscUtils.toRadians,
    normalizeAngle = miscUtils.normalizeAngle,
    randomAngle    = randUtils.randomAngle,
    randomOpacity  = randUtils.randomOpacity,
    randomScalar   = randUtils.randomScalar,
    randomInRange  = randUtils.randomInRange;

var heartIconFactory = require("../icon-factory");

/*** Note ***/
// assigning `null` out the gate speeds up future assignments.
// the performance gain is probably neglible...
// BUT I ONLY HAVE ONE SPEED 
// AND IT IS OPTIMAL
/*** End of Note ***/
module.exports = {
    "_SCALAR": null,
    "_THETA": null,
    angle: null,
    blur: null,
    doNotRemove: null,
    fan: null,
    floatingInSpace: null,
    geyser: null,
    color: null,
    count: null,
    fixed: null,
    image: null,
    imageSrc: null,
    opacity: null,
    rotate: null,
    scalar: null,
    transformOrigin: null,
    transitionDuration: null,
    transitionFunction: null,
    translateX: null,
    translateY: null,
    x: null,
    xNoise: null,
    y: null,
    yNoise: null,
    addTransform: function addTransform(operation) {
        this.image.style["-webkit-transform"] += operation;
        this.image.style["-ms-transform"]     += operation;
        this.image.style.transform            += operation;
        return this;
    },
    appendToBody: function appendToBody() {
        document.querySelector("body").appendChild(this.image);
        return this;
    },
    animate: function animate() {
        var translate,
            transforms = [
                this.getScale(1), // apparently this helps for scaling on an iPad? haven't checked tbh
                this.getRotate(),
                this.getScale(),
            ];

        // TODO - clean this logick up. yucky.
        if (!this.fanHearts) {
            transforms.forEach(this.addTransform.bind(this));
        }
        window.requestAnimationFrame(function() {
            if (this.fan) {
                transforms.forEach(this.addTransform.bind(this));
            }
            this.addTransform(this.getTranslate()).fadeOut();
        }.bind(this));

        return this;
    },
    fadeOut: function fadeOut() {
        if (!this.doNotRemove) {
            var removeHeart = this.remove.bind(this);
            this.image.style.opacity = 0;
            setTimeout(removeHeart, this.transitionDuration);
            return this;
        }
    },
    remove: function remove() {
        document.querySelector("body").removeChild(this.image);
        return this;
    },
    getAngle: function getAngle() {
        if (!this.rotate) return 0;
        if (typeof this._THETA !== "number") {
            this._THETA = normalizeAngle(randomAngle(this.angle));
        }
        return this._THETA;
    },
    getImageSrc: function getImageSrc() {
        if (!this.imageSrc) {
            this.imageSrc = heartIconFactory({
                fill: this.color,
                blur: this.blur,
            });
        }
        return this.imageSrc;
    },
    getRotate: function getRotate(theta) {
        if (theta === undefined) theta = this.getAngle();
        return "rotate("+theta+"deg)";
    },
    getScalar: function getScalar() {
        if (typeof this._SCALAR !== "number") {
            this._SCALAR = randomScalar(this.scalar);
        }
        return this._SCALAR;
    },
    getScale: function getScale(k) {
        if (k === undefined) k = this.getScalar();
        return "scale("+k+")";
    },
    getStyle: function getStyle() {
        var left       = (this.getX() - this.image.width/2),
            top        = (this.getY() - this.image.height/2),
            opacity    = randomOpacity(this.opacity);
        return [
            "left:"+left+"px",
            "opacity:"+opacity,
            "position:fixed",
            "pointer-events:none",
            "top:"+top+"px",
            "transform-origin:"+this.transformOrigin,
            "-webkit-transform-origin:"+this.transformOrigin,
            "-ms-transform-origin:"+this.transformOrigin,
            "transition: "+this.getTransition(),
            "-moz-transition: "+this.getTransition(),
            "-webkit-transition: "+this.getTransition(),
        ].join(";");
    },
    getTransition: function getTransition() {
        return this.transitionDuration+"ms "+ this.transitionFunction;
    },
    getTranslate: function getTranslate() {
        // TODO: separate this into translateX and translateY
        var tx = randomInRange(this.translateX),
            ty = -randomInRange(this.translateY);

        if (this.floatingInSpace) return this.spaceyTranslate(tx, ty);

        return "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
    },
    getX: function getX() {
        return this.x + this.getXNoise();
    },
    getXNoise: function getXNoise() {
        return randomInRange(this.xNoise||0);
    },
    getY: function getY() {
        return this.y + this.getYNoise();
    },
    getYNoise: function getYNoise() {
        return randomInRange(this.yNoise||0);
    },
    setCoordinates: function setCoordinates(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    setImage: function setImage() {
        this.image = document.createElement("img");
        this.image.src = this.getImageSrc();
        return this;
    },
    show: function show() {
        this.image.style.cssText += this.getStyle();
        this.appendToBody();
        return this;
    },
    // TODO
    // this is a fixer-upper...
    spaceyTranslate: function spaceyTranslate(tx, ty) {
        var angle = this.getAngle(),
            translateLength = Math.sqrt(tx*tx + ty*ty);
        tx = translateLength * Math.sin(toRadians(angle));
        ty = translateLength * Math.cos(toRadians(angle));

        if      (angle >= 0   && angle < 90)  { ty *= -1;  }
        else if (angle >= 90  && angle < 180) { /* pass */ }
        else if (angle >= 180 && angle < 270) { tx *= -1;  }
        else                                  { tx *= -1; ty *= -1;  }

        return  "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
    }

};
},{"../icon-factory":5,"../utilities/misc":16,"../utilities/random":17}],14:[function(require,module,exports){
(function (global){
// TODO
// - cache existing animations
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./arguments-helper":1,"./factories/animation-collection-factory":3,"./presets/preset-loader":10}],15:[function(require,module,exports){
module.exports = function extend() {
    // extends an arbitrary number of objects
    var args   = [].slice.call(arguments, 0),
        result = args[0];

    for (var i=1; i < args.length; i++) {
        result = extendHelper(result, args[i]);
    }

    return result;
};

function extendHelper(destination, source) {
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}
},{}],16:[function(require,module,exports){
module.exports = {
    toRadians: function toRadians(theta) {
        return normalizeAngle(theta)*(Math.PI / 180);
    },
    normalizeAngle: normalizeAngle,
};

function normalizeAngle(theta) {
    while (theta < 0) { theta += 360; }
    return theta % 360;
}
},{}],17:[function(require,module,exports){
module.exports = {
    randomAngle: function randomAngle() {
        return randomInRange.apply(null, arguments);
    },
    randomOpacity: function randomOpacity() {
        return randomInRange_hundreths.apply(null, arguments);
    },
    randomScalar: function randomScalar() {
        return randomInRange_hundreths.apply(null, arguments);
    },
    randomInRange: randomInRange,
};

function randomInRange() {
    var args = normalizeArguments(arguments),
        min  = args[0],
        max  = args[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange_hundreths() {
    var args = normalizeArguments(arguments),
        min  = args[0],
        max  = args[1];
    return randomInRange(min*100, max*100)/100;
}

function normalizeArguments(args) {

    args = [].slice.call(args);
    var result = [],
        head   = args[0];

    if (!args.length) noArgumentError();

    // Case 1: Two numbers (hopefully), which we return as a Range
    if (args.length > 1) return args;

    // Case 2: Only one argument, and it's a number.
    if (typeof head === "number") {
        return [head, head];
    }

    // Case 3: Only one argument, and it's a Range (hopefully)
    return head;
}

function noArgumentError() {
    throw new Error("You supplied no arguments to a function that needed arguments. Check the call stack!");
}
},{}]},{},[14]);
