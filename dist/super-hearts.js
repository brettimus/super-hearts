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
// module.exports = {
//     blur: 0,
//     doNotRemove: false,
//     fan: false,
//     floatingInSpace: false,
//     geyser: false,
//     count: [5, 8],
//     color: "#B91319",
//     imageSrc: undefined,
//     opacity: [0.10, 0.45],
//     rotate: false,
//     scalar: [0.35, 0.75],
//     transformOrigin: "center center",
//     transitionDuration: 500,
//     transitionFunction: "ease-out",
//     translateX: [0, 100],
//     translateY: [0, 100],
//     xNoise: [-50, 50],
//     yNoise: [-50, 50],
// };

module.exports = require("./presets/circle");
},{"./presets/circle":5}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = {
    angle: [0, 359],
    count: [6, 10],
    fixed: true,
    opacity: [0.10, 0.75],
    scalar: [0.15, 0.45],
    transitionDuration: 600,
    translateY: [15, 45],
};
},{}],5:[function(require,module,exports){
var extend = require("../utilities/extend");

var circle = {
    angle: [0, 359],
    blur: 0,
    doNotRemove: false,
    fan: false,
    floatingInSpace: false,
    geyser: false,
    count: [5, 8],
    color: "#B91319",
    imageSrc: undefined,
    opacity: [0.10, 0.65],
    scalar: [0.10, 0.35],
    transformOrigin: "center center",
    transitionDuration: 600,
    transitionFunction: "ease-out",
    translateX: [0, 0],
    translateY: [15, 45],
    xNoise: 0,
    yNoise: 0,
};

module.exports = circle;
},{"../utilities/extend":30}],6:[function(require,module,exports){
var extend = require("../utilities/extend"),
    base = {count: 1, scalar: 0.4, translateY: 100 },
    n = extend({}, base, {angle: 0}),
    e = extend({}, base, {angle: 90, color: "darkgreen"}),
    s = extend({}, base, {angle: 180, color: "blue"}),
    w = extend({}, base, {angle: 270, color: "purple"});

module.exports = [n, e, s, w];
},{"../utilities/extend":30}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
module.exports = {
    rotate: false,
    transitionDuration: 650,
    translateX: [-60, 60]
};
},{}],9:[function(require,module,exports){
var buttonDefaults  = require("./button"),
    circleDefaults  = require("./circle"),
    compassDefaults = require("./compass"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser");

module.exports = function loadPresets(SuperHearts) {
    SuperHearts.registerPreset("Button", buttonDefaults);
    SuperHearts.registerPreset("Compass", compassDefaults);
    SuperHearts.registerPreset("Circle", circleDefaults);
    SuperHearts.registerPreset("Line", lineDefaults);
    SuperHearts.registerPreset("Geyser", geyserDefaults);
};


},{"./button":4,"./circle":5,"./compass":6,"./geyser":7,"./line":8}],10:[function(require,module,exports){
var animationCollectionProto = require("./animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    var animationCollection = Object.create(animationCollectionProto).setSelector(selector).setElement(selector);
    animationCollection.animations = []; // NB - this is necessary to keep the collection's prototype from being modified by calls to `addAnimation`
    return animationCollection;
};
},{"./animation-collection-prototype":11}],11:[function(require,module,exports){
var animationFactory = require("../animation/animation-factory");

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
},{"../animation/animation-factory":12}],12:[function(require,module,exports){
var heartProtoFactory = require("../heart/heart-prototype-factory"),
    animationProto = require("./animation-prototype"),
    fixed = require("./mixins/events-fixed"),
    unfixed = require("./mixins/events-unfixed"),
    geyser = require("./mixins/geyser");

var mainDefault = require("../../default"),
    extend = require("../../utilities/extend");



module.exports = function animationFactory(selector, options) {

    var animation,
        elt           = document.querySelector(selector),
        modHeartProto = heartProtoFactory(extend({}, mainDefault, options));

    if (elt === null) {
        console.log("No element matched the given selector: \""+selector+"\"");
        console.log("~i shall fail silently~");
        return;
    }

    if (modHeartProto.geyser) {
        animation = Object.create(extend(animationProto, geyser));
        animation.modHeartProto = modHeartProto;
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
    }
    else {
        if (modHeartProto.fixed) {
            animation = Object.create(extend(animationProto, fixed));
        } else {
            animation = Object.create(extend(animationProto, unfixed));
        }
        animation.events = {
            click: null,
            touch: null,
        };
        animation.modHeartProto = modHeartProto;
    }

    animation.count = modHeartProto.count;
    // animation.selector = selector; // where is this used?
    animation.heartFactory = function heartFactory(x, y) {
        return Object.create(modHeartProto).setCoordinates(x, y).setImage();
    };

    animation.start(elt);

    return animation;
};
},{"../../default":2,"../../utilities/extend":30,"../heart/heart-prototype-factory":18,"./animation-prototype":13,"./mixins/events-fixed":15,"./mixins/events-unfixed":16,"./mixins/geyser":17}],13:[function(require,module,exports){
var randomInRange = require("../../utilities/random").randomInRange;

var animationProto = {

    count: null, // TODO - should store this here...

    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },

    spewHearts: function spewHearts(x,y) {
        var count = randomInRange(this.count);
        for (var i = 0; i < count; i++) {
            window.requestAnimationFrame(this.heartSpewer(x, y).bind(this));
        }
    },

    heartSpewer: function heartSpewer(x,y) {
        return function() {
            this.heartFactory(x, y).show().animate();
        };
    },

    heartFactory: function heartFactory(x, y) {
        throw new Error("Must define heartFactory on an animation");
    },

    start: function start() {
        throw new Error("Must define start method on an animation.");
    },

};

module.exports = animationProto;
},{"../../utilities/random":32}],14:[function(require,module,exports){
module.exports = {
    events: null,
    start: function start(elt) {
        this.events.click = this.onclick.bind(this);
        this.events.touchend = this.ontouch.bind(this);
        elt.addEventListener("click", this.events.click);
        elt.addEventListener("touchend", this.events.touchend);
    },
    onclick: function onclick(e) {
        throw new Error("Must define onclick");
    },
    ontouch: function ontouch(e) {
        throw new Error("Must define ontouch");
    },
    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },
};
},{}],15:[function(require,module,exports){
var base = require("./events-base");
var extend = require("../../../utilities/extend");


var proto = {
    onclick: function onclick(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },

    ontouch: function ontouch(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },
};

module.exports = extend({}, base, proto);
},{"../../../utilities/extend":30,"./events-base":14}],16:[function(require,module,exports){
var extend = require("../../../utilities/extend");
var base = require("./events-base");

var proto = {
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
};

module.exports = extend({}, base, proto);
},{"../../../utilities/extend":30,"./events-base":14}],17:[function(require,module,exports){
module.exports = {
    start: function start(elt) {
        var eltRect = elt.getBoundingClientRect(),
            geyserX = eltRect.left + ((eltRect.width) / 2),
            geyserY = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    },
};
},{}],18:[function(require,module,exports){
var heartProto  = require("./heart-prototype"),
    animate     = require("./mixins/animate-default"),
    fanimate    = require("./mixins/animate-fan"),
    extend      = require("../../utilities/extend"),
    mainDefault = require("../../default"),
    mixins      = require("./mixins");

module.exports = function heartFactory(options) {
    // var toExtend = [{}, heartProto, options].concat(getMixins(options));  // TODO - figure out better sequencing here
    var animater;
    if (options.fan) {
        animater = fanimate;
    }
    else {
        animater = animate;
    }
    var toExtend = [{}, heartProto, animater, options];
    return extend.apply(null, toExtend);
};


// This was tooooo clever. but keeping it for now just to look at it and appreciate its sentiment
function getMixins(options) {
    // this is kind of dumb but whatever
    var result = Object.keys(mixins).filter(ifNeedsMixin(options)).map(getMixin);
    return result;
}

function ifNeedsMixin(options) {
    return function(mixinName) {
        console.log(mixinName);
        return !!options[mixinName];
    };
}

function getMixin(name) {
    return mixins[name];
}
},{"../../default":2,"../../utilities/extend":30,"./heart-prototype":19,"./mixins":23,"./mixins/animate-default":20,"./mixins/animate-fan":21}],19:[function(require,module,exports){
var extend = require("../../utilities/extend"),
    image = require("./mixins/image"),
    position = require("./mixins/position"),
    rotate = require("./mixins/rotate"),
    scale = require("./mixins/scale"),
    transition = require("./mixins/transition"),
    translate = require("./mixins/translate");


heartProto = {
    doNotRemove: null,
    fan: null,
    floatingInSpace: null,
    geyser: null,
    count: null,
    fixed: null,

    animate: function animate() {
        var translate,
            transforms = this.getInitialTransforms();

        transforms.forEach(this.addTransform.bind(this));
        window.requestAnimationFrame(function() {
            this.getAnimatedTransforms().forEach(function(transform) {
                this.addTransform(transform).hide();
            }, this);
        }.bind(this));

        return this;
    },
    hide: function hide() {
        throw new Error("Must specify a hide function");
    },
    remove: function remove() {
        throw new Error("Must specify a remove function");
    },
    show: function show() {
        // should call window.requestAnimationFrame
        // add initial transforms
        // append to body
        throw new Error("Must define show function");
    },
    getInitialTransforms: function getInitialTransforms() {
        throw new Error("Must define initial transforms getter");
    },
    getAnimatedTransforms: function getAnimatedTransforms() {
        throw new Error("Must define animated transforms getter");
    },
};

module.exports = extend(heartProto, position, image, rotate, scale, transition, translate);
},{"../../utilities/extend":30,"./mixins/image":22,"./mixins/position":24,"./mixins/rotate":25,"./mixins/scale":26,"./mixins/transition":27,"./mixins/translate":28}],20:[function(require,module,exports){
module.exports = {
    getInitialTransforms: function getInitialTransforms() {
        var transforms = [];
        if (this.getScale) transforms.push(this.getScale(1));  // apparently this helps for animation on an iPad... yet to test. remember seeing it on a stack overflow thingy
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        return transforms;
    },
    getAnimatedTransforms: function getAnimatedTransforms() {
        var transforms = [];
        if (this.getTranslate) transforms.push(this.getTranslate());
        return transforms;
    },
};

// *** This had a weird effect on animation... not sure where to put it *** //
// function weird() {
//     var translate,
//         transforms = this.getInitialTransforms();

//     if (this.fan) return console.log("Sorry! Fanning is temporarily out of order.");

//     // transforms.forEach(this.addTransform.bind(this));

//     window.requestAnimationFrame(function() {
//         transforms.forEach(this.addTransform.bind(this));
//         window.requestAnimationFrame(function() {
//             this.addTransform(this.getTranslate()).hide();
//         }.bind(this));
//     }.bind(this));

//     return this;
// }
},{}],21:[function(require,module,exports){
// fanimation throws an error on element removal now... :(
module.exports = {
    getInitialTransforms: function getInitialTransforms() {
        var transforms = [];
        return transforms;
    },
    getAnimatedTransforms: function getAnimatedTransforms() {
        var transforms = [];
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        if (this.getTranslate) transforms.push(this.getTranslate());
        return transforms;
    },
};
},{}],22:[function(require,module,exports){
// TODO - refactor getStyle
var heartIconFactory = require("../../../icon-factory");
var randomInRange = require("../../../utilities/random").randomInRange;
var randomOpacity = require("../../../utilities/random").randomOpacity;


module.exports = {
    blur: null,
    color: null,
    image: null,
    imageSrc: null,
    opacity: null,
    transformOrigin: null,

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
    fadeOut: function fadeOut() {
        if (!this.doNotRemove) {
            var removeHeart = this.remove.bind(this);
            this.image.style.opacity = 0;
            setTimeout(removeHeart, this.transitionDuration);
            return this;
        }
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
    hide: function hide() {
        return this.fadeOut();
    },
    remove: function remove() {
        document.querySelector("body").removeChild(this.image);
        return this;
    },
    setImage: function setImage() {
        this.image = document.createElement("img");
        this.image.src = this.getImageSrc();
        if (this.imageHeight) this.image.height = this.imageHeight;
        if (this.imageWidth) this.image.width = this.imageWidth;
        return this;
    },
    show: function show() {
        this.image.style.cssText += this.getStyle();
        this.appendToBody();
        return this;
    },
    getStyle: function getStyle() {
        var left       = this.getInitialX(),
            top        = this.getInitialY(),
            opacity    = randomOpacity(this.opacity),
            transform  = "translate3d("+ left + "px, " + top + "px, 0)",
            transition = this.getTransition();

        return [
            "left:"+0+"px",
            "opacity:"+opacity,
            "position:fixed",
            "pointer-events:none",
            "top:"+0+"px",
            "transform-origin:"+this.transformOrigin,
            "-webkit-transform-origin:"+this.transformOrigin,
            "-ms-transform-origin:"+this.transformOrigin,
            "transform:" + transform,
            "-webkit-transform:" + transform,
            "transition:" + transition,
            "-moz-transition:" + transition,
            "-webkit-transition:" + transition,
        ].join(";");
    },
};
},{"../../../icon-factory":3,"../../../utilities/random":32}],23:[function(require,module,exports){
// THIS IS NOT ACTUALLY BEING USED...

var rotate = require("./rotate"),
    scale = require("./scale"),
    transition = require("./transition"),
    translate = require("./translate"),
    animate = require("./animate-default");
module.exports = {
    animate: animate,
    rotate: rotate,
    scale: scale,
    transition: transition,
    translate: translate,
};


// var fs              = require("fs"),
//     path            = require("path"),
//     files           = ["rotate","scale"];

// function normalizeFileName(name) {
//     return path.basename(name, path.extname(name));
// }

// function isNotCurrentFile(file) {
//     return file !== normalizeFileName(module.filename);
// }

// function exportMixin(name) {
//     module.exports[name] = require(name);
// }

// module.exports = (function() {
//     files.filter(isNotCurrentFile).forEach(exportMixin);
// })();
},{"./animate-default":20,"./rotate":25,"./scale":26,"./transition":27,"./translate":28}],24:[function(require,module,exports){
// TODO - remove references to this.image
var randomInRange = require("../../../utilities/random").randomInRange;

module.exports = {
    x: null,
    xNoise: null,
    y: null,
    yNoise: null,

    // TODO - abstract away the offset here
    getInitialX: function getInitialX() {
        var x = this.getX() - this.image.width/2;
        return x;
    },
    getInitialY: function getInitialY() {
        var y = this.getY() - this.image.height/2;
        return y;
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
};
},{"../../../utilities/random":32}],25:[function(require,module,exports){
var randomAngle    = require("../../../utilities/random").randomAngle,
    normalizeAngle = require("../../../utilities/misc").normalizeAngle;

module.exports = {
    "_THETA": null,
    angle: null,
    rotate: true,
    getAngle: function getAngle() {
        if (!this.rotate) return 0;
        if (typeof this._THETA !== "number") {
            this._THETA = normalizeAngle(randomAngle(this.angle));
        }
        return this._THETA;
    },
    getRotate: function getRotate(theta) {
        if (theta === undefined) theta = this.getAngle();
        return "rotate("+theta+"deg)";
    },
};
},{"../../../utilities/misc":31,"../../../utilities/random":32}],26:[function(require,module,exports){
var randomScalar = require("../../../utilities/random").randomScalar;

module.exports = {
    "_SCALAR": null,
    scalar: null,

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
};
},{"../../../utilities/random":32}],27:[function(require,module,exports){
module.exports = {
    transitionDuration: null,
    transitionFunction: null,
    getTransition: function getTransition() {
        return this.transitionDuration+"ms "+ this.transitionFunction;
    },
};
},{}],28:[function(require,module,exports){
var randomInRange = require("../../../utilities/random").randomInRange;

module.exports = {
    translateX: null,
    translateY: null,

    getTranslateX: function getTranslateX() {
        var tx = randomInRange(this.translateX);
        if (this.getScalar) tx = tx / this.getScalar();
        return tx;
    },
    getTranslateY: function getTranslateY() {
        var ty = -randomInRange(this.translateY);
        if (this.getScalar) ty = ty / this.getScalar();
        return ty;
    },

    getTranslate: function getTranslate() {
        // TODO: separate this into getTranslateX and getTranslateY
        var tx = this.getTranslateX(),
            ty = this.getTranslateY();

        return "translate3d("+tx+"px,"+ty+"px, 0)";
    },
};
},{"../../../utilities/random":32}],29:[function(require,module,exports){
(function (global){
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

        if (Object.prototype.toString.call(presetDefaults) !== '[object Array]') {
            presetDefaults = [presetDefaults];
        }

        if (presetDefaults.length > optionsArray.length) {
            presetDefaults.forEach(function(preset, i) {
                optionsArray[i] = extend({}, preset, optionsArray[i] || {});
            });
        }
        else {
            // Merge user options _after_ preset defaults so they can still override the defaults of a given preset
            optionsArray.forEach(function(options, i) {
                optionsArray[i] = extend({}, presetDefaults[i] || {}, options);
            });
        }

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    };
};

loadPresets(SuperHearts);
global.SuperHearts = SuperHearts;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./arguments-helper":1,"./presets/preset-loader":9,"./prototypes/animation-collection/animation-collection-factory":10,"./utilities/extend":30}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
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
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
