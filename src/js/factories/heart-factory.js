var heartProto  = require("../prototypes/heart/heart-prototype"),
    extend      = require("../utilities/extend"),
    mainDefault = require("../default"),
    mixins      = require("../prototypes/heart/mixins");

module.exports = function heartFactory(options) {
    // var toExtend = [{}, heartProto, options].concat(getMixins(options));  // TODO - figure out better sequencing here
    var toExtend = [{}, heartProto, options];
    return extend.apply(null, toExtend);
};


// This was tooooo clever. but keeping it for now just to look at it and appreciate its sentiment
function getMixins(options) {
    // this is kind of dumb but whatever
    var result = Object.keys(mixins).filter(ifNeedsMixin(options)).map(getMixin);
    return result;
}

function ifNeedsMixin(options) {
    return function(mixinName) {
        console.log(mixinName);
        return !!options[mixinName];
    };
}

function getMixin(name) {
    return mixins[name];
}