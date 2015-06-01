var Range = require("./range");

module.exports = Animation;

function Animation(animationSteps, options) {

    this.count = new Range(options.count); // could define this as a property with get function that accesses this.countRange
    this.options = options;

    this.start = animationSteps[0];

    // make the animations into a linked list
    for (var i = 0; i < animationSteps.length; i++) {
        animationSteps[i].next = animationSteps[i+1];
    }
}