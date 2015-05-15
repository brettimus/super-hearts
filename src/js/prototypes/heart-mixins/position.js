// TODO - remove references to this.image
var randomInRange = require("../../utilities/random").randomInRange;

module.exports = {
    x: null,
    xNoise: null,
    y: null,
    yNoise: null,

    // TODO - abstract away the offset here
    getInitialX: function getInitialX() {
        var x = this.getX() - this.image.width/2;
        return x;
    },
    getInitialY: function getInitialY() {
        var y = this.getY() - this.image.height/2;
        return y;
    },

    getX: function getX() {
        return this.x + this.getXNoise();
    },
    getXNoise: function getXNoise() {
        return randomInRange(this.xNoise||0);
    },
    getY: function getY() {
        return this.y + this.getYNoise();
    },
    getYNoise: function getYNoise() {
        return randomInRange(this.yNoise||0);
    },

    setCoordinates: function setCoordinates(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
};