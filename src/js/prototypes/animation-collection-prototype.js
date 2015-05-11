var animationFactory = require("../factories/animation-factory");

module.exports = {
    selector: null,
    animations: [],

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        return this;
    },
    compose: function compose() {
        this.addAnimation(options);
        return this;
    }
};