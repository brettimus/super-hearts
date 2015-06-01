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
    this._styles = [];
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
    this._style = [];
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
    console.log("rotating");
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