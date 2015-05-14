var randUtils      = require("../utilities/random"),
    randomOpacity  = randUtils.randomOpacity,
    randomInRange  = randUtils.randomInRange,
    extend = require("../utilities/extend");

var heartIconFactory = require("../icon-factory");

// code smell - this should not know about the image
var positionMixin = {
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

// TODO - refactor getStyle
var imageMixin = {
    blur: null,
    color: null,
    image: null,
    imageSrc: null,

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
    getImageSrc: function getImageSrc() {
        if (!this.imageSrc) {
            this.imageSrc = heartIconFactory({
                fill: this.color,
                blur: this.blur,
            });
        }
        return this.imageSrc;
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

heartProto = {
    angle: null,
    doNotRemove: null,
    fan: null,
    floatingInSpace: null,
    geyser: null,
    count: null,
    fixed: null,
    opacity: null,
    scalar: null,
    transformOrigin: null,
    transitionDuration: null,
    transitionFunction: null,
    translateX: null,
    translateY: null,


    /* TODO these bool configs aren't triggering mixins... */
    animate: true,
    rotate: true,
    scale: true,
    transition: true,
    translate: true,

    addTransform: function addTransform(operation) {
        throw new Error("addTransform unspecified");
        //pass 
    },

    appendToBody: function appendToBody() {
        throw new Error("appendToBody unspecified");
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

    getTransforms: function getTransforms() {
        var transforms = [];
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        return transforms;
    },
};

module.exports = extend(heartProto, imageMixin, positionMixin);