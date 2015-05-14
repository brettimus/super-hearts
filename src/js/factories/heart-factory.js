var heartProto  = require("../prototypes/heart-prototype"),
    extend      = require("../utilities/extend"),
    mainDefault = require("../default"),
    mixins      = require("../mixins");

module.exports = function heartFactory(options) {
    return extend.apply(null, [{}, heartProto, options].concat(getMixins(options)));
};

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