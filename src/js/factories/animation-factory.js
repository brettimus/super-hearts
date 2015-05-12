// TODO - refactor dat factory
// the factory function does stuff it shouldn't be responsible for

var heartProto = require("../prototypes/heart-prototype"),
    animationProto = require("../prototypes/animation-prototype");

var mainDefault = require("../default"),
    extend = require("../utilities/extend");

module.exports = function animationFactory(selector, options) {
    // TODO
    // this shouldn't need to know `selector`
    // have animationCollection inject an `elt` corresponding to original anim?
    //
    var animation     = Object.create(animationProto),
        elt           = document.querySelector(selector),
        modHeartProto = extend({}, heartProto, mainDefault, options);

    if (elt === null) {
        console.log("No element matched the given selector: \""+selector+"\"");
        console.log("~i shall fail silently~");
        return;
    }

    animation.selector = selector;
    animation.modHeartProto = modHeartProto;


    // TODO
    // this is so wrong

    if (modHeartProto.geyser) {
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
        animation.geyser(elt);
    }
    else if (modHeartProto.fixed) {
        elt.addEventListener("click", animation.onclickFixed.bind(animation));
        elt.addEventListener("touchEnd", animation.ontouchFixed.bind(animation));
    }
    else {
        elt.addEventListener("click", animation.onclick.bind(animation));
        elt.addEventListener("touchend", animation.ontouch.bind(animation));
    }

    return animation;
};