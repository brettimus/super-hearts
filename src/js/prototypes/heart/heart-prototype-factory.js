var heartProto  = require("./heart-prototype"),
    animate     = require("./mixins/animate-default"),
    fanimate    = require("./mixins/animate-fan"),
    extend      = require("../../utilities/extend"),
    mainDefault = require("../../default"),
    mixins      = require("./mixins");

module.exports = function heartFactory(options) {
    // var toExtend = [{}, heartProto, options].concat(getMixins(options));  // TODO - figure out better sequencing here
    var animater;
    if (options.fan) {
        animater = fanimate;
    }
    else {
        animater = animate;
    }
    var toExtend = [{}, heartProto, animater, options];
    return extend.apply(null, toExtend);
};