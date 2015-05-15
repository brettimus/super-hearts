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