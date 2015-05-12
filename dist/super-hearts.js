(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// This is a `utility` but it deserves its own file...
module.exports = function argumentsHelper() {
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

    // // 
    // if (result.optionsArray.length === 0) {
    //     result.optionsArray.push({});
    // }

    return result;
};
},{}],2:[function(require,module,exports){
module.exports = {
    circle: {
        angleRange: [0, 359],
        fanHearts: false,
        floatingInSpace: false,
        geyser: false,
        heartsCount: [6, 10],
        heartColor: "#B91319",
        imageSrc: undefined,
        opacityRange: [0.10, 0.75],
        rotateHearts: true,
        scalarRange: [0.15, 0.45],
        transformOrigin: "center center",
        transitionDuration: 400,
        transitionFunction: "ease-out",
        translateXRange: [0, 0],
        translateYRange: [15, 45],
    },
    line: {
        rotateHearts: false,
        transitionDuration: 650,
        translateXRange: [-60, 60]
    },
    geyser: {
        angleRange: [-10, 10],
        geyser: true,
        geyserInterval: 200,
        heartsCount: [1,1],
        opacityRange: [0.3, 0.6],
        scalarRange: [0.20, 0.25],
        transitionDuration: 800,
        translateXRange: [-45, 45],
        translateYRange: [30, 60]
    }
};
},{}],3:[function(require,module,exports){
var animationCollectionProto = require("../prototypes/animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    return Object.create(animationCollectionProto).setSelector(selector);
};
},{"../prototypes/animation-collection-prototype":7}],4:[function(require,module,exports){
// TODO - refactor dat factory
// the factory function does stuff it shouldn't be responsible for

var heartProto = require("../prototypes/heart-prototype"),
    animationProto = require("../prototypes/animation-prototype");

var mainDefault = require("../defaults").circle;
var extend = require("../utilities").extend;
var heartIconFactory = require("../icon-factory");

module.exports = function animationFactory(selector, options) {
    // TODO
    // this shouldn't need to know `selector`
    // have animationCollection inject an `elt` corresponding to original anim?
    //
    var animation     = Object.create(animationProto),
        elt           = document.querySelector(selector),
        modHeartProto = extend({}, heartProto, mainDefault, options);

    animation.selector = selector;
    animation.modHeartProto = modHeartProto;


    // TODO
    // doesn't it seem like this 

    if (modHeartProto.geyser) {
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
        animation.geyser(elt);
    }
    else {
        elt.addEventListener("click", animation.onclick.bind(animation));
        elt.addEventListener("touchend", animation.ontouch.bind(animation));
    }

    return animation;
};
},{"../defaults":2,"../icon-factory":5,"../prototypes/animation-prototype":8,"../prototypes/heart-prototype":9,"../utilities":11}],5:[function(require,module,exports){
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

var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';
module.exports = function(options) {
    var fill = options.fill,
        icon = SVG.replace("%FILL%", fill),
        src = 'data:image/svg+xml;charset=utf-8,'+icon;
    return src;
};
},{}],6:[function(require,module,exports){
// TODO - move this to its own directory
var DEFAULTS = require("./defaults"),
    argumentsHelper = require("./arguments-helper");

var extend = require("./utilities").extend;

module.exports = function loadPresets(SuperHearts) { // is this a confusing or consistent parameter name?

    function presetHandler(presetDefaults, originalArgs) {
        var args         = argumentsHelper(originalArgs),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // Merge user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return SuperHearts.apply(SuperHearts, [selector].concat(optionsArray));
    }

    SuperHearts.Line = function Line() {
        return presetHandler(DEFAULTS.line, arguments);
    };

    SuperHearts.Geyser = function Geyser() {
        return presetHandler(DEFAULTS.geyser, arguments);
    };
};
},{"./arguments-helper":1,"./defaults":2,"./utilities":11}],7:[function(require,module,exports){
var animationFactory = require("../factories/animation-factory");

module.exports = {
    animations: [],

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        this.animations.push(result);
        return this;
    },

    compose: function compose(options) {
        this.addAnimation(options);
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
},{"../factories/animation-factory":4}],8:[function(require,module,exports){
var randomInRange = require("../utilities").randomInRange;

module.exports = {

    heartsCount: null, // should have this here...
    modHeartProto: null,

    onclick: function onclick(e) {
        console.log(e);
        var x = e.pageX,
            y = e.pageY;
        console.log(x, y);
        // this.spewHearts(x, y - e.clientY);
        this.spewHearts(e.x, e.y);
        // this.spewHearts(e.screenX, e.screenY);
        // this.spewHearts(e.clientX, e.clientY);
    },

    ontouch: function ontouch(e) {
        // var x = e.changedTouches[0].pageX,
        //     y = e.changedTouches[0].pageY;
        var x = e.changedTouches[0].x,
            y = e.changedTouches[0].y;
        this.spewHearts(x, y);
    },

    spewHearts: function spewHearts(x,y) {
        var count = randomInRange(this.modHeartProto.heartsCount);
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
        var eltRect   = elt.getBoundingClientRect(),
            geyserX   = eltRect.left + ((eltRect.width) / 2),
            geyserY   = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    }

};
},{"../utilities":11}],9:[function(require,module,exports){
// TODO
// make this smaller! it does too much

// TODO
// switch to only using utils module...
var utils = require("../utilities"),
    square = utils.square,
    toRadians = utils.toRadians,
    randomAngle = utils.randomAngle,
    randomOpacity = utils.randomOpacity,
    randomScalar = utils.randomScalar,
    randomInRange = utils.randomInRange;

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
    angleRange: null,
    fanHearts: null,
    floatingInSpace: null,
    geyser: null,
    heartColor: null,
    heartsCount: null,
    image: null,
    imageSrc: null,
    opacityRange: null,
    rotateHearts: null,
    scalarRange: null,
    transformOrigin: null,
    transitionDuration: null,
    transitionFunction: null,
    translateXRange: null,
    translateYRange: null,
    x: null,
    y: null,
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

        // TODO - clean this logick up. yuckie.
        if (!this.fanHearts) {
            transforms.forEach(this.addTransform.bind(this));
        }
        window.requestAnimationFrame(function() {
            if (this.fanHearts) {
                transforms.forEach(this.addTransform.bind(this));
            }
            this.addTransform(this.getTranslate()).fadeOut();
        }.bind(this));

        return this;
    },
    fadeOut: function fadeOut() {
        var removeHeart = this.remove.bind(this);
        this.image.style.opacity = 0;
        setTimeout(removeHeart, this.transitionDuration);
        return this;
    },
    remove: function remove() {
        document.querySelector("body").removeChild(this.image);
        return this;
    },
    getAngle: function getAngle() {
        // normalize the angle for consistency
        var theta;
        if (!this.rotateHearts) return 0;
        if (typeof this._THETA !== "number") {
            theta = randomAngle(this.angleRange[0], this.angleRange[1]);
            while (theta < 0) { theta += 360; }
            theta = theta % 360;
            this._THETA = theta;
        }
        return this._THETA;
    },
    getImageSrc: function getImageSrc() {
        if (!this.imageSrc) {
            this.imageSrc = heartIconFactory({
                fill: this.heartColor,
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
            this._SCALAR = randomScalar(this.scalarRange[0], this.scalarRange[1]);
        }
        return this._SCALAR;
    },
    getScale: function getScale(k) {
        if (k === undefined) k = this.getScalar();
        return "scale("+k+")";
    },
    getStyle: function getStyle() {
        var left       = (this.x - this.image.width/2),
            top        = (this.y - this.image.height/2),
            opacity    = randomOpacity(this.opacityRange[0], this.opacityRange[1]);
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
        var tx = randomInRange(this.translateXRange),
            ty = -randomInRange(this.translateYRange);

        if (this.floatingInSpace) return this.spaceyTranslate(tx, ty);

        return "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
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
            translateLength = Math.sqrt(square(tx) + square(ty));
        tx = translateLength * Math.sin(toRadians(angle));
        ty = translateLength * Math.cos(toRadians(angle));

        if      (angle >= 0   && angle < 90)  { ty *= -1;  }
        else if (angle >= 90  && angle < 180) { /* pass */ }
        else if (angle >= 180 && angle < 270) { tx *= -1;  }
        else                                  { tx *= -1; ty *= -1;  }

        return  "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
    }

};
},{"../icon-factory":5,"../utilities":11}],10:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./arguments-helper":1,"./factories/animation-collection-factory":3,"./preset-loader":6}],11:[function(require,module,exports){
module.exports = {
    square: function square(x) {
        return x*x;
    },
    toRadians: function toRadians(theta) {
        while (theta < 0) { theta += 360; }
        return (theta % 360)*(Math.PI / 180);
    },
    randomAngle: function randomAngle(a, b) {
        return randomInRange(a, b);
    },
    randomOpacity: function randomOpacity(a, b) {
        return randomInRange(a*100, b*100)/100;
    },
    randomScalar: function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*100, b*100)/100;
    },
    randomInRange: randomInRange,
    extend: function extend() {
        // extends an arbitrary number of objects
        var args   = [].slice.call(arguments, 0),
            result = args[0];

        for (var i=1; i < args.length; i++) {
            result = extendHelper(result, args[i]);
        }

        return result;
    },
};

// TODO - clean this up
function randomInRange(a, b) {
    var args = [].slice.call(arguments);
    if (args.length === 1) {
        if (args[0].length < 2) throw new Error("a range array must have two values");
        a = args[0][0];
        b = args[0][1];
    }
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

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
},{}]},{},[10]);
