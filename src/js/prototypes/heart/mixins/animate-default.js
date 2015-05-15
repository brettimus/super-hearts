module.exports = {
    getInitialTransforms: function getInitialTransforms() {
        var transforms = [];
        if (this.getScale) transforms.push(this.getScale(1));  // apparently this helps for animation on an iPad... yet to test. remember seeing it on a stack overflow thingy
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        return transforms;
    },
    getAnimatedTransforms: function getAnimatedTransforms() {
        var transforms = [];
        if (this.getTranslate) transforms.push(this.getTranslate());
        return transforms;
    },
};

// *** This had a weird effect on animation... not sure where to put it *** //
// function weird() {
//     var translate,
//         transforms = this.getInitialTransforms();

//     if (this.fan) return console.log("Sorry! Fanning is temporarily out of order.");

//     // transforms.forEach(this.addTransform.bind(this));

//     window.requestAnimationFrame(function() {
//         transforms.forEach(this.addTransform.bind(this));
//         window.requestAnimationFrame(function() {
//             this.addTransform(this.getTranslate()).hide();
//         }.bind(this));
//     }.bind(this));

//     return this;
// }