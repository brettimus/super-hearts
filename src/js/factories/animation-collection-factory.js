var animationCollectionProto = require("../prototypes/animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    return Object.create(animationCollectionProto).setSelector(selector);
};