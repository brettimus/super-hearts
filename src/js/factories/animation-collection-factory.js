var animationCollectionProto = require("../prototypes/animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    var result = Object.create(animationCollectionProto);
    result.setSelector(selector);
    return result;
};