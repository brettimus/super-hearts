var randomInRange = require("../utilities/random").randomInRange;

module.exports = {

    count: null, // TODO - should store this here...
    modHeartProto: null,

    onclick: function onclick(e) {
        var x = e.pageX,
            y = e.pageY;
        this.spewHearts(x, y);
    },

    ontouch: function ontouch(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        this.spewHearts(x, y);
    },

    onclickFixed: function onclickFixed(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },

    ontouchFixed: function ontouchFixed(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
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

    // TODO - make a `geyserAnimation` prototype
    // * BUG - coordinates do not automagically correct on window resizing
    geyser: function geyser(elt) {
        var eltRect = elt.getBoundingClientRect(),
            geyserX = eltRect.left + ((eltRect.width) / 2),
            geyserY = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    }

};