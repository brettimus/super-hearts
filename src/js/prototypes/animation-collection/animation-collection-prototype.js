var animationFactory = require("../../factories/animation-factory");

module.exports = {
    animations: null, // Array (assigned on instance creation in factory function).
    element: null,    // will be frozen
    selector: null,   // will be frozen

    addAnimation: function addAnimation(options) {
        var result = animationFactory(this.selector, options);
        this.animations.push(result);
        return this;
    },

    removeAnimation: function removeAnimation() {
        console.log("removeAnimation is _not yet implemented_");
        return this;
    },

    compose: function compose(options) {
        this.addAnimation(options);
        return this;
    },

    removeAll: function removeAll() {
        this.animations.forEach(function(animation, i, animations) {
            animation.remove(this.selector);
            animations[i] = null;
        }, this);
        this.animations = [];
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