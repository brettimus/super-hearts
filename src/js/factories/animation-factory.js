// TODO - refactor dat factory
// the factory function does stuff it shouldn't be responsible for

var heartFactory = require("./heart-factory"),
    animationProto = require("../prototypes/animation/animation-prototype");

var mainDefault = require("../default"),
    extend = require("../utilities/extend");



module.exports = function animationFactory(selector, options) {
    // TODO
    // this shouldn't need to know `selector`
    // have animationCollection inject an `elt` corresponding to original anim?
    //
    var animation     = Object.create(animationProto),
        elt           = document.querySelector(selector),
        modOpts       = extend({}, mainDefault, options),
        modHeartProto = heartFactory(modOpts);

    if (elt === null) {
        console.log("No element matched the given selector: \""+selector+"\"");
        console.log("~i shall fail silently~");
        return;
    }

    animation.events = {
        click: null,
        touch: null,
    };
    animation.selector = selector;
    animation.modHeartProto = modHeartProto;


    // TODO
    // this is so wrong

    if (modHeartProto.geyser) {
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
        animation.geyser(elt);
    }
    else if (modHeartProto.fixed) {
        animation.events.click = animation.onclickFixed.bind(animation);
        elt.addEventListener("click", animation.events.click);
        animation.events.touchend = animation.ontouchFixed.bind(animation);
        elt.addEventListener("touchend", animation.events.touchend);
    }
    else {
        animation.events.click = animation.onclick.bind(animation);
        elt.addEventListener("click", animation.events.click);
        animation.events.touchend = animation.ontouch.bind(animation);
        elt.addEventListener("touchend", animation.events.touchend);
    }

    return animation;
};