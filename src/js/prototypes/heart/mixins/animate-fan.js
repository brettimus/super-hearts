// fanimation throws an error on element removal now... :(
module.exports = {
    getInitialTransforms: function getInitialTransforms() {
        var transforms = [];
        return transforms;
    },
    getAnimatedTransforms: function getAnimatedTransforms() {
        var transforms = [];
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        if (this.getTranslate) transforms.push(this.getTranslate());
        return transforms;
    },
};