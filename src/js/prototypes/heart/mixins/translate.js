var randomInRange = require("../../../utilities/random").randomInRange;

module.exports = {
    translateX: null,
    translateY: null,

    getTranslateX: function getTranslateX() {
        var tx = randomInRange(this.translateX);
        if (this.getScalar) tx = tx / this.getScalar();
        return tx;
    },
    getTranslateY: function getTranslateY() {
        var ty = -randomInRange(this.translateY);
        if (this.getScalar) ty = ty / this.getScalar();
        return ty;
    },

    getTranslate: function getTranslate() {
        // TODO: separate this into getTranslateX and getTranslateY
        var tx = this.getTranslateX(),
            ty = this.getTranslateY();

        return "translate3d("+tx+"px,"+ty+"px, 0)";
    },
};