module.exports = {
    initialize: function initialize(elt) {
        var eltRect = elt.getBoundingClientRect(),
            geyserX = eltRect.left + ((eltRect.width) / 2),
            geyserY = eltRect.top + (eltRect.height / 2);

        setInterval(function(){
            this.spewHearts(geyserX, geyserY);
        }.bind(this), this.modHeartProto.geyserInterval);
    },
};