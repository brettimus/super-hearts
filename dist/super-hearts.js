(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var B = require("boots-utils");

module.exports = Compiler;

/**
 * @constructor
 * @param {string} [open] - margs beginning of template string that's to be evaluated
 * @param {string} [close] - marks end of template string that's to be evaluated
 */
function Compiler(open, close) {
    this.open  = open  || "{{";
    this.close = close || "}}";
}

/**
 * Compiles a string in the given object's context 
 * @method
 */
Compiler.prototype.compile = function(string, object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            string = B.replaceAll(string, this.open+prop+this.close, object[prop]);
        }
    }
    return string;
};
},{"boots-utils":6}],2:[function(require,module,exports){
var Compiler = require("./compiler");
var Template = require("./template");
var BooTemplate = Template;
BooTemplate.Compiler = Compiler;
module.exports = Template;
},{"./compiler":1,"./template":3}],3:[function(require,module,exports){
var Compiler = require("./compiler");

module.exports = Template;

/**
 * @constructor
 * @param {string} template - The template string
 * @param {string} [open] - margs beginning of a template value that's to be evaluated
 * @param {string} [close] - marks end of a template value that's to be evaluated
 */
 function Template(template, open, close) {
    this.template = template;
    this.compiler = new Compiler(open, close);
 }

/**
 * Wraps Compiler~compile with the target string scoped to Template~string
 * @method
 * @param {object} o - Ojbect whose values are inserted into the string.
 * @return {string}
 */
 Template.prototype.compile = function(o) {
     return this.compiler.compile(this.template, o);
 };


},{"./compiler":1}],4:[function(require,module,exports){
module.exports = {
    loadJSON: loadJSON,
};

/**
 * Shallow-copies an arbitrary number of objects' properties into the first argument. Applies "last-in-wins" policy to conflicting property names.
 * @function loadJSON
 * @param {string} path
 * @param {function} success
 * @param {function} error
 */
function loadJSON(path, success, error, context) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        context = context || this;
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success.call(context, JSON.parse(xhr.responseText));
                }
            } else {
                if (error) {
                    error.call(context, xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
    return xhr;
}
},{}],5:[function(require,module,exports){
module.exports = {
    first: first,
    isArray: isArray,
    randomInArray: randomInArray,
    range: range,
};

/**
 * Returns first element of array to return true in the given predicate function.
 * @function isArray
 * @param {array} ary
 * @param {function} predicate
 * @return {*}
 */
function first(ary, predicate, context) {
    var len = ary.length;
    for (var i = 0; i < len; i++) {
        if (predicate.call(context, ary[i])) {
            return ary[i];
        }
    }
}

/**
 * @function isArray
 * @param {*} o
 * @return {boolean}
 */
function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}

/**
 * 
 * @function range
 * @param {number} start
 * @param {number} end
 * @param {number} [step]
 */
function range(start, end, step) {
    step = step || 1;
    var result = [];
    for (;start <= end; start += step) result.push(start);
    return result;
}

/**
 * 
 * @function randomInArray
 * @param {array} ary
 * @return {*}
 */
function randomInArray(ary) {
    return ary[Math.floor(Math.random() * ary.length)];
}
},{}],6:[function(require,module,exports){
module.exports = {
    ajax: require("./ajax"),
    array: require("./array"),
    extend: extend,
    nTimes: nTimes,
    nully: nully,
    replaceAll: replaceAll,
    test: {
        assert: function(bool, message) {
            if (!bool) console.log(message);
        }
    }
};


function nTimes(n, fun) {
    var counter = n;
    if (n <= 0) return;
    while (counter--) fun(n - counter);
}

/**
 * Tests whether value is null or undefined
 * @function esacpeRegExp
 */
function nully(x) {
    return x == null;
}

/**
 * Escapes a string for use in RegExp
 * @function esacpeRegExp
 */
function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

/**
 * Globally replaces a given string in another string
 * @function replaceAll
 * @param {stirng} [options] - RegExp options (like "i").
 **/
function replaceAll(string, toReplace, replaceWith, options) {
    options = options || "";
    var reOpts = "g" + options,
        re     = new RegExp(escapeRegExp(toReplace), reOpts);

    return string.replace(re, replaceWith);
}

/**
 * Shallow-copies an arbitrary number of objects' properties into the first argument. Applies "last-in-wins" policy to conflicting property names.
 * @function extend
 * @param {...Object} o
 */
function extend(o) {
    var args   = [].slice.call(arguments, 0),
        result = args[0];

    for (var i=1; i < args.length; i++) {
        result = extendHelper(result, args[i]);
    }

    return result;
}

/**
 * Shallow-copies one object into another.
 * @function extendHelper
 * @param {Object} destination - Object into which `source` properties will be copied.
 * @param {Object} source - Object whose properties will be copied into `destination`.
 */
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
},{"./ajax":4,"./array":5}],7:[function(require,module,exports){
var B = require("boots-utils"),
    nTimes = B.nTimes;

var Animator = require("./animator"),
    Icon = require("./icon"),
    Image = require("./image"),
    Range = require("./range");

module.exports = AnimationCollection;

/**
 * Object returned by SuperHearts
 * @constructor
 */
function AnimationCollection() {
    this.animations = [];
}

/**
 * Adds an animation
 * @method
 */
AnimationCollection.prototype.add = function add(animation) {
    this.animations.push(animation);
    return this;
};

/**
 * Todo - make this pass off some responsibilities... It's a monster!
 */
AnimationCollection.prototype.animate = function animate(elt, x, y, starter) {
    this.animations.forEach(function(a) {
        this._animate(a, elt, x ,y ,starter);
    }, this);
};


AnimationCollection.prototype._animate = function(a, elt, x, y, starter) {
    var o = a.options;
    var times = a.count.get();
    var current = a.start;
    var k = o.scalar || 1;

    var icon;
    if (!o.imageSrc) {
        icon = new Icon(o.color, o.blur);
        o.imageSrc = icon.src;
        o.imageHeight = icon.height;
        o.imageWidth = icon.width;
    }

    var startX = x,
        startY = y;
    if (o.imageWidth)
        startX -= o.imageWidth/2;
    if (o.imageHeight)
        startY -= o.imageHeight/2;



    current
        .clear()  // Resets queues
        .position("fixed")
        .x(0)
        .y(0)
        .transformOrigin("center center")
        .translate(startX, startY)
        .opacity(o.opacity)
        .rotate(o.rotate)
        .scale(k);

    nTimes(times, function() {

        var img = new Image(elt, "", o);
        img.style(current.print())
            .show();

        window.requestAnimationFrame(function() {
            var styles     = current.next.printNonTransforms(),
                transforms = current.next._compileTransforms();

            img.style(styles).transform(transforms);
        });

    });
};
},{"./animator":9,"./icon":12,"./image":13,"./range":23,"boots-utils":6}],8:[function(require,module,exports){
var Range = require("./range");

module.exports = Animation;

function Animation(animationSteps, options) {

    this.count = new Range(options.count); // could define this as a property with get function that accesses this.countRange
    this.options = options;

    this.start = animationSteps[0];

    // make the animations into a linked list
    for (var i = 0; i < animationSteps.length; i++) {
        animationSteps[i].next = animationSteps[i+1];
    }
}
},{"./range":23}],9:[function(require,module,exports){
var isNully = require("boots-utils").nully,
    BooTemplate = require("boo-templates");
var Range = require("./range");

var styleTemplate = new BooTemplate("{{property}}:{{value}}{{units}};");
var transformTemplate = new BooTemplate("{{operator}}({{operand}}{{units}})");

function execute(f) {
    return f();
}

module.exports = Animator;

/**
 * Responsible for generating style strings
 * @constructor
 */
function Animator(options) {
    var prop;
    this._styles = [];
    this._transforms = [];
    // for (prop in options) {
    //     if (Animator.prototype.hasOwnProperty(prop)) {
    //         a[prop](options[prop]);
    //     }
    // }
}

/**
 * This is hacky -- `getter` spoofs being a range by implementing a 'get' method
 * @method
 */
Animator.prototype.print = function() {
    var compiledTransforms = this._compileTransforms();
        getter = {
            get: function() {
                return compiledTransforms;
            },
        };

    this._addStyle("transform", getter);
    this._addStyle("-webkit-transform", getter);

    return this._styles.map(execute).join("");
};

/**
 * @method
 */
Animator.prototype.printTransforms = function() {
    var ts = this._compileTransforms();
    return styleTemplate.compile({
        property: "transform",
        value: ts,
    });
};

/**
 * @method
 */
Animator.prototype._compileTransforms = function() {
    return this._transforms.map(execute).join(" ");
};

/**
 * @method
 */
Animator.prototype.printNonTransforms = function() {
    return this._styles.map(execute).join(" ");
};

Animator.prototype.clear = function() {
    this.clearTransforms();
    this.clearStyles();
    return this;
};

/**
 * @method
 */
Animator.prototype.clearTransforms = function() {
    this._transforms = [];
    return this;
};

Animator.prototype.clearStyles = function() {
    this._styles = [];
    return this;
};

/**
 * @method
 */
Animator.prototype.opacity = function(n) {
    var r = new Range.RangeHundredths(n);
    return this._addStyle("opacity", r);
};

/**
 * @method
 */
Animator.prototype.position = function(n) {
    var r = new Range(n);
    return this._addStyle("position", r);
};


/**
 * @method
 * Adds a rotation transform.
 */
Animator.prototype.rotate = function(n) {
    var r = new Range(n);
    return this._addTransform("rotate", r, "deg");
};


/**
 * @method
 * Adds a scale transform.
 */
Animator.prototype.scale = function(k) {
    var r = new Range.RangeHundredths(k);
    return this._addTransform("scale", r);
};

/**
 * @method
 */
Animator.prototype.transformOrigin = function(n) {
    var r = new Range(n);
    return this._addStyle("transform-origin", r, "ms");
};

/**
 * TODO make polymorphic
 * @method
 * Adds a transition-duration property.
 */
Animator.prototype.transitionDuration = function(n) {
    var r = new Range(n);
    return this._addStyle("transition-duration", r, "ms");
};

/**
 * TODO make polymorphic
 * @method
 * Adds a transition-function property.
 */
Animator.prototype.transitionFunction = function(n) {
    var r = new Range(n);
    return this._addStyle("transition-timing-function", r);
};

/**
 * TODO make polymorphic
 * @method
 * Adds a transition-function property.
 */
Animator.prototype.transitionProperty = function(n) {
    var r = new Range(n);
    return this._addStyle("transition-property", r);
};


/**
 * Wrapper method for translateX, translateY, and translateZ
 * @method
 */
Animator.prototype.translate = function(x, y, z) {
    if (isNully(z)) z = 0;
    var rx = new Range(x),
        ry = new Range(y),
        rz = new Range(z);
    var getter = {
        get: function() {
            return [rx.get() + "px", ry.get()+"px", rz.get()+"px"];
        },
    };

    this._addTransform("translate3d", getter);
    return this;
};

/**
 * Sets a translateX transform (px)
 * @method
 */
Animator.prototype.translateX = function(x) {
    var r = new Range(x);
    return this._addTransform("translateX", r, "px");
};

/**
 * Sets a translateY transform (px)
 * @method
 */
Animator.prototype.translateY = function(y) {
    var r = new Range(y);
    return this._addTransform("translateY", r, "px");
};

/**
 * Sets a translateZ transform (px)
 * @method
 */
Animator.prototype.translateZ = function(z) {
    var r = new Range(z);
    return this._addTransform("translateZ", r, "px");
};

/**
 * Sets a top left value (px)
 * @method
 */
Animator.prototype.x = function(x) {
    var r = new Range(x);
    return this._addStyle("left", r);
};

/**
 * Sets left value (px) 
 * @method
 */
Animator.prototype.y = function(y) {
    var r = new Range(y);
    return this._addStyle("top", r);
};



/**
 * Queues a function that when executed returns a given transform operation
 * @method
 */
Animator.prototype._addTransform = function(operator, range, units) {
    if (isNully(units)) units = "";
    this._transforms.push(function() {
        var operand = range.get();
        return transformTemplate.compile({
            operator: operator,
            operand : operand,
            units   : units,
        });
    });
    return this;
};

/**
 * Queues a function that when executed returns a given style rule
 * @method
 */
Animator.prototype._addStyle = function(property, range, units) {
    if (isNully(units)) units = "";
    this._styles.push(function() {
        var value = range.get();
        return styleTemplate.compile({
            property: property,
            value   : value,
            units: units,
        });
    });
    return this;
};
},{"./range":23,"boo-templates":2,"boots-utils":6}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{"./presets/circle":17}],12:[function(require,module,exports){
var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="%BLUR%" result="blurry" /><feMerge><feMergeNode in="SourceGraphic"></feMergeNode><feMergeNode in="blurry"></feMergeNode></feMerge></filter><g id="heart" style="filter:url(#blur); "><path style="fill: %FILL%; %STYLES%" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></g></svg>';

module.exports = Icon;

function Icon(fill, blur, styles) {
    this.fill = fill || "#B91319";
    this.blur = blur || 0;
    this.styles = styles || "";
    this.src = src(this.fill, this.blur, this.styles);

    this.height = 88;
    this.width = 100;
}

function src(fill, blur, styles) {
    var icon = SVG.replace("%FILL%", fill).replace("%BLUR%", blur).replace("%STYLES%", styles),
        result = 'data:image/svg+xml;charset=utf-8,'+icon;
    return result;
}
},{}],13:[function(require,module,exports){
var B = require("boots-utils"),
    Icon = require("./icon");

module.exports = Image;

function Image(container, initStyle, options) {
    this.container = container;
    this.initStyle = initStyle;
    this.image = document.createElement("img");
    this.image.src = options.imageSrc || (new Icon()).src; // icon should be default;
    this.imageHeight = options.imageHeight;
    this.imageWidth = options.imageWidth;
    // TODO - height and width
}

Image.prototype.style = function(style) {
    this.image.style.cssText += style;
    return this;
};

Image.prototype.transform = function(transform) {
    this.image.style.transform += " " + transform;
    this.image.style.webkitTransform += " " + transform;
    return this;
};

Image.prototype.show = function(next) {
    this.image.style.cssText = this.initStyle + this.image.style.cssText;
    this.container.appendChild(this.image);
    if (next) next();
    return this;
};

Image.prototype.hide = function(next) {
    console.log("Image#hide NYI");
    // if (next) next();
    return this;
};

Image.prototype.remove = function(next) {
    this.container.removeChild(this.image);
    if (next) next();
    return this;
};


// animator generated by options
// x and y are set on an event
},{"./icon":12,"boots-utils":6}],14:[function(require,module,exports){
var extend = require("boots-utils").extend,
    range = require("boots-utils").array.range,
    angles = range(0, 360, 20),
    base = {
        count: 1,
        scalar: .2,
        transitionDuration: 4200,
        translateY: -140/.2,
        translatZ: -20,
    },
    result = [];

angles.forEach(function(a) {
    result.push(extend({}, base, {rotate: a}));
});

module.exports = result;

},{"boots-utils":6}],15:[function(require,module,exports){
var extend = require("boots-utils").extend,
    range = require("boots-utils").array.range,
    angles = range(0, 360, 20),
    base = {
        count: 1,
        fixed: true,
        scalar: [0.18, 0.22],
        transitionDuration: 2400,
        translateY: 140,
        translateX: 0,
    },
    result = [];

angles.forEach(function(a) {
    result.push(extend({}, base, {rotate: a}));
});

module.exports = result;

},{"boots-utils":6}],16:[function(require,module,exports){
module.exports = {
    rotate: [0, 359],
    count: [6, 10],
    fixed: true,
    opacity: [0.10, 0.75],
    scalar: [0.15, 0.45],
    transitionDuration: 600,
    translateY: [15, 45],
};
},{}],17:[function(require,module,exports){
var circle = {
    blur: 0,
    doNotRemove: false,
    count: [2, 5],
    color: "#B91319",
    imageHeight: 88,
    imageWidth: 100,
    opacity: [0.10, 0.65],
    rotate: [0, 359],
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
},{}],18:[function(require,module,exports){
var extend = require("boots-utils").extend,
    base = {
        count: 1,
        imageHeight: 88,
        imageWidth: 100,
        scalar: 0.4,
        translateY: 100,
    },
    n = extend({}, base, {rotate: 0, color: "#A30015"}),
    e = extend({}, base, {rotate: 90, color: "#73BA9B"}),
    s = extend({}, base, {rotate: 180, color: "#258EA6"}),
    w = extend({}, base, {rotate: 270, color: "#493548"});

module.exports = [n, e, s, w];
},{"boots-utils":6}],19:[function(require,module,exports){
var extend = require("boots-utils").extend,
    base = {
        count: 1,
        imageHeight: 88,
        imageWidth: 100,
        scalar: 0.4,
        translateY: -100,
        translateX: 0,
    },
    n = extend({}, base, {rotate: 0, color: "#A30015"}),
    e = extend({}, base, {rotate: 90, color: "#73BA9B"}),
    s = extend({}, base, {rotate: 180, color: "#258EA6"}),
    w = extend({}, base, {rotate: 270, color: "#493548"});

module.exports = [n, e, s, w];
},{"boots-utils":6}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
module.exports = {
    rotate: 0,
    blur: 0,
    count: [5, 8],
    color: "#B91319",
    doNotRemove: false,
    fan: false,
    floatingInSpace: false,
    geyser: false,
    imageHeight: 88,
    imageWidth: 100,
    opacity: [0.10, 0.65],
    scalar: [0.10, 0.35],
    transformOrigin: "center center",
    transitionDuration: 660,
    transitionFunction: "ease-out",
    translateX: [-60, 60],
    translateY: [15, 45],
    xNoise: 0,
    yNoise: 0,
};
},{}],22:[function(require,module,exports){
var bigRingDefaults       = require("./big-ring"),
    buttonDefaults        = require("./button"),
    buttonBigRingDefaults = require("./button-big-ring"),
    circleDefaults        = require("./circle"),
    compassDefaults       = require("./compass"),
    compassAltDefaults    = require("./compass-alt"),
    lineDefaults          = require("./line"),
    geyserDefaults        = require("./geyser");

module.exports = function loadPresets(SuperHearts) {
    SuperHearts.registerPreset("BigRing", bigRingDefaults);
    SuperHearts.registerPreset("Button", buttonDefaults);
    SuperHearts.registerPreset("ButtonBigRing", buttonBigRingDefaults);
    SuperHearts.registerPreset("Compass", compassDefaults);
    SuperHearts.registerPreset("CompassAlt", compassAltDefaults);
    SuperHearts.registerPreset("Circle", circleDefaults);
    SuperHearts.registerPreset("Line", lineDefaults);
    SuperHearts.registerPreset("Geyser", geyserDefaults);
};


},{"./big-ring":14,"./button":16,"./button-big-ring":15,"./circle":17,"./compass":19,"./compass-alt":18,"./geyser":20,"./line":21}],23:[function(require,module,exports){
var B = require("boots-utils");

Range.RangeHundredths = RangeHundredths;
module.exports = Range;

function Range(data) {
    this.dispatch(data);
}

Range.prototype.get = function() {
    return B.array.randomInArray(this.data);
};


Range.prototype.dispatch = function dispatch(data, dataType) {
    var setters = {
            'number': this._primitive,
            'string': this._primitive,
            'array': this._array,
            'object': this._object,
        };
    this.data = setters[this.type(data)](data);
    return this;
};

Range.prototype._primitive = function _primitive(n) {
    return [n];
};

Range.prototype._array = function _array(ary) {
    return B.array.range(ary[0], ary[1]);
};

Range.prototype._object = function _object(o) {
    if (o.sample) this.get = o.sample;
    return o.data;
};

Range.prototype.type = function type(v) {
    if (B.array.isArray(v)) {
        return "array";
    } else {
        return typeof v;
    }
};

/**
 * This is suuuper messy right now. 
 * @constructor 
 */
function RangeHundredths(data) {
    Range.call(this, data);
    if (this.type(data) === "array") {
        this.get = newGet;
    }
}
RangeHundredths.prototype = Object.create(Range.prototype);

RangeHundredths.prototype._array = function(ary) {
    return B.array.range(ary[0]*100, ary[1]*100);
};

function newGet() {
    return Range.prototype.get.call(this) / 100;
}
},{"boots-utils":6}],24:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./animation":8,"./animation-collection":7,"./animator":9,"./arguments-helper":10,"./default":11,"./image":13,"./presets/preset-loader":22,"boots-utils":6}]},{},[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
