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