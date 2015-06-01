var Range = require("./range");

module.exports = Animation;

function Animation(start, end, options) {
    this.count = new Range(options.count); // could define this as a property with get function that accesses this.countRange
    this.start = start;
    this.end = end;
    this.options = options;
}