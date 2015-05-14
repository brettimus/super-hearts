var randomAngle    = require("../utilities/random").randomAngle,
    normalizeAngle = require("../utilities/misc").normalizeAngle;

module.exports = {
    "_THETA": null,
    getAngle: function getAngle() {
        if (!this.rotate) return 0;
        if (typeof this._THETA !== "number") {
            this._THETA = normalizeAngle(randomAngle(this.angle));
        }
        return this._THETA;
    },
    getRotate: function getRotate(theta) {
        if (theta === undefined) theta = this.getAngle();
        return "rotate("+theta+"deg)";
    },
};