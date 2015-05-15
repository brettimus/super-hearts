var randomInRange = require("../../utilities/random").randomInRange;

var animationProto = {

    count: null, // TODO - should store this here...
    modHeartProto: null,

    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },

    spewHearts: function spewHearts(x,y) {
        var count = randomInRange(this.modHeartProto.count);
        for (var i = 0; i < count; i++) {
            window.requestAnimationFrame(this.heartSpewer(x, y).bind(this));
        }
    },

    heartFactory: function heartFactory(x, y) {
        return Object.create(this.modHeartProto).setCoordinates(x, y).setImage();
    },

    heartSpewer: function heartSpewer(x,y) {
        return function() {
            this.heartFactory(x, y).show().animate();
        };
    },

    initialize: function initialize() {
        throw new Error("Must define initialize on an animation.");
    },

};

module.exports = animationProto;