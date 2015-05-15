var randomInRange = require("../../utilities/random").randomInRange;

var animationProto = {

    count: null, // TODO - should store this here...

    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },

    spewHearts: function spewHearts(x,y) {
        var count = randomInRange(this.count);
        for (var i = 0; i < count; i++) {
            window.requestAnimationFrame(this.heartSpewer(x, y).bind(this));
        }
    },

    heartSpewer: function heartSpewer(x,y) {
        return function() {
            this.heartFactory(x, y).show().animate();
        };
    },

    heartFactory: function heartFactory(x, y) {
        throw new Error("Must define heartFactory on an animation");
    },

    start: function start() {
        throw new Error("Must define start method on an animation.");
    },

};

module.exports = animationProto;