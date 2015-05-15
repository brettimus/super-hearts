var extend = require("../../utilities/extend"),
    animate = require("./mixins/animate"),
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


    // TODO - where to put this defn?
    // currently called in two different mixins 
    addTransform: function addTransform(operation) {
        // TODO this should be removed from the main proto 
        throw new Error("addTransform unspecified");
    },


    // Ideal, minimal interface
    // (everything that an animation collection expects to be on a heart) //
    animate: function animate() {
        throw new Error("Must define an animate function.");
    },
    hide: function hide() {
        throw new Error("Must specify a hide function");
    },
    remove: function remove() {
        throw new Error("Must specify a remove function");
    },
    show: function show() {
        throw new Error("Must define show function");
    },
};

module.exports = extend(heartProto, image, position, animate, rotate, scale, transition, translate);