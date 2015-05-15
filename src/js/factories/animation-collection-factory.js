var animationCollectionProto = require("../prototypes/animation-collection/animation-collection-prototype");

module.exports = function animationCollectionFactory(selector) {
    var animationCollection = Object.create(animationCollectionProto).setSelector(selector).setElement(selector);
    animationCollection.animations = []; // NB - this is necessary to keep the collection's prototype from being modified by calls to `addAnimation`
    return animationCollection;
};