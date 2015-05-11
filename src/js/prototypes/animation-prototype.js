var mainDefault = require("../defaults").circle;

var heartIconFactory = require("../icon-factory");

var utils         = require("../utilities"),
    randomInRange = utils.randomInRange,
    extend        = utils.extend;

var heartProto = require("./heart-prototype");


module.exports = {
    modHeartProto: null,
    selector: null,
    liveAnimations: [],

    addAnimation: addAnimation,
    compose: function compose() {
        this.addAnimation(this.selector, options);
        return this;
    }
};


function addAnimation(selector, options) {
    var elt       = document.querySelector(selector),
        config    = extend({}, heartProto, mainDefault, options);

    this.selector = selector;

    // * TODO group with other geyser shit
    // * BUG - coordinates do not automagically correct on window resizing
    var eltRect   = elt.getBoundingClientRect(),
        geyserX   = eltRect.left + ((eltRect.width) / 2),
        geyserY   = eltRect.top + (eltRect.height / 2);

    // TODO put this somewhere else... this is sloppy
    if (!config.imageSrc) {
        config.imageSrc = heartIconFactory({
            fill: config.heartColor,
        });
    }

    if (config.geyser) {
        geyser();
    }
    else {
        elt.addEventListener("click", onclick);
        elt.addEventListener("touchend", ontouch);
    }

    function heartFactory(x, y) {
        return Object.create(config).setCoordinates(x, y).setImage();
    }

    function heartSpewer(x,y) {
        return function() {
            heartFactory(x, y).show().animate();
        };
    }

    function spewHearts(x,y) {
        var count = randomInRange(config.heartsCount);
        for (var i = 0; i < count; i++) {
            window.requestAnimationFrame(heartSpewer(x, y));
        }
    }

    function onclick(e) {
        var x = e.pageX,
            y = e.pageY;
        spewHearts(x, y);
    }

    function ontouch(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        spewHearts(x, y);
    }

    function geyser() {
        config.geyserInterval = config.geyserInterval || config.transitionDuration/2;
        setInterval(function(){
            spewHearts(geyserX, geyserY);
        }, config.geyserInterval);
    }
}