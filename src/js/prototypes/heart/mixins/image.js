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
    appendToDOM: function appendToDOM() {
        var selector = this.getContainerSelector();
        document.querySelector(selector).appendChild(this.image);
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
    getContainerSelector: function getContainerSelector() {
        var selector = "body";
        if (this.imageAppendedTo) selector = this.imageAppendedTo;
        return selector;
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
        var selector = this.getContainerSelector();
        document.querySelector(selector).removeChild(this.image);
        return this;
    },
    setImage: function setImage() {
        this.image = document.createElement("img");
        this.image.src = this.getImageSrc();
        if (this.imageClass) this.image.className += " " + this.imageClass;
        if (this.imageHeight) this.image.height = this.imageHeight;
        if (this.imageWidth) this.image.width = this.imageWidth;
        return this;
    },
    show: function show() {
        this.image.style.cssText += this.getStyle();
        this.appendToDOM();
        return this;
    },
    getStyle: function getStyle() {
        var left       = this.getInitialX(),
            top        = this.getInitialY(),
            opacity    = randomOpacity(this.opacity),
            position   = this.position ? this.position : "fixed",
            transform  = "translate3d("+ left + "px, " + top + "px, 0)",
            transition = this.getTransition();

        return [
            "left:"+0+"px",
            "opacity:"+opacity,
            "position:"+position,
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