// TODO - refactor dat factory
// the factory function does stuff it shouldn't be responsible for

var heartFactory = require("./heart-factory"),
    animationProto = require("../prototypes/animation/animation-prototype"),
    fixed = require("../prototypes/animation/mixins/events-fixed"),
    unfixed = require("../prototypes/animation/mixins/events-unfixed"),
    geyser = require("../prototypes/animation/mixins/geyser");

var mainDefault = require("../default"),
    extend = require("../utilities/extend");



module.exports = function animationFactory(selector, options) {
    // TODO
    // this shouldn't need to know `selector`
    // have animationCollection inject an `elt` corresponding to original anim?
    //

    var animation,
        elt           = document.querySelector(selector),
        modOpts       = extend({}, mainDefault, options),
        modHeartProto = heartFactory(modOpts);

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

    animation.selector = selector;

    // TODO
    // this is so wrong

    // if (modHeartProto.geyser) {
    //     animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
    //     animation.geyser(elt);
    // }
    // else {
    //     animation.initialize(elt);
    // }
    animation.initialize(elt);

    return animation;
};