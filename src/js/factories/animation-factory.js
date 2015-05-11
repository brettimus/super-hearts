// TODO - refactor that factory
// the factory function does stuff it shouldn't be responsible for

var heartProto = require("../prototypes/heart-prototype"),
    animationProto = require("../prototypes/animation-prototype");

var mainDefault = require("../defaults").circle;
var extend = require("../utilities").extend;
var heartIconFactory = require("../icon-factory");



module.exports = function animationFactory(selector, options) {
    var animation     = Object.create(animationProto),
        elt           = document.querySelector(selector),
        modHeartProto = extend({}, heartProto, mainDefault, options);

    animation.selector = selector;
    animation.modHeartProto = modHeartProto;

    // TODO put this somewhere else... this is sloppy
    if (!modHeartProto.imageSrc) {
        modHeartProto.imageSrc = heartIconFactory({
            fill: modHeartProto.heartColor,
        });
    }

    if (modHeartProto.geyser) {
        animation.modHeartProto.geyserInterval = animation.modHeartProto.geyserInterval || animation.modHeartProto.transitionDuration/2;
        animation.geyser(elt);
    }
    else {
        elt.addEventListener("click", animation.onclick.bind(animation));
        elt.addEventListener("touchend", animation.ontouch.bind(animation));
    }
};