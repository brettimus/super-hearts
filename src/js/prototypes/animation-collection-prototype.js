var animationFactory = require("../factories/animation-factory");

module.exports = {
    animations: null, // Array (assigned on instance creation in factory function).

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        this.animations.push(result);
        return this;
    },

    compose: function compose(options) {
        this.addAnimation(options);
        return this;
    },

    // TODO - store element instead of selector
    // Not in use
    setElement: function setElement(selector) {
        var value = document.querySelector(selector),
            description = {
                configurable: false,
                writable: false,
                value: value,
            };
        Object.defineProperty(this, "element", description);
        return this;
    },

    // NB Freezes selector
    setSelector: function setSelector(selector) {
        var description = {
            configurable: false,
            writable: false,
            value: selector,
        };
        Object.defineProperty(this, "selector", description);
        return this;
    },
};