var randomInRange = require("../utilities").randomInRange;

module.exports = {

    count: null, // TODO - should store this here...
    modHeartProto: null,

    onclick: function onclick(e) {
        console.log(e);
        var x = e.pageX,
            y = e.pageY;
        console.log(x, y);
        // this.spewHearts(x, y - e.clientY);
        this.spewHearts(e.x, e.y);
        // this.spewHearts(e.screenX, e.screenY);
        // this.spewHearts(e.clientX, e.clientY);
    },

    ontouch: function ontouch(e) {
        // var x = e.changedTouches[0].pageX,
        //     y = e.changedTouches[0].pageY;
        var x = e.changedTouches[0].x,
            y = e.changedTouches[0].y;
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
        var eltRect   = elt.getBoundingClientRect(),
            geyserX   = eltRect.left + ((eltRect.width) / 2),
            geyserY   = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    }

};