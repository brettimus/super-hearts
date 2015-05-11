var animationFactory = require("../factories/animation-factory");

module.exports = {
    animations: [],

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        return this;
    },
    compose: function compose() {
        this.addAnimation(options);
        return this;
    },
    // Freezes selector
    setSelector: function setSelector(selector) {
        var description = {
            configurable: false,
            writable: false,
            value: selector,
        };
        Object.defineProperty(this, "selector", description);
    },
};