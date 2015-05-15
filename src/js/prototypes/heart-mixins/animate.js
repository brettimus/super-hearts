module.exports = {
    animate: animate,
    getTransforms: function getTransforms() {
        var transforms = [];
        if (this.getRotate) transforms.push(this.getRotate());
        if (this.getScale) transforms.push(this.getScale());
        return transforms;
    },
};
// TODO - check assumptions
// * .getTransforms()
// * .getTranslate()
// * .addTransform()
//
// * .hide() [okay]

function animate() {
    var translate,
        transforms = this.getTransforms();

    if (this.fan) return console.log("Sorry! Fanning is temporarily out of order.");

    transforms.forEach(this.addTransform.bind(this));

    window.requestAnimationFrame(function() {
        this.addTransform(this.getTranslate()).hide();
    }.bind(this));

    return this;
}

// *** NOT IN USE *** //

function fanimate() {
    var translate,
        transforms = this.getTransforms();

    window.requestAnimationFrame(function() {
        translate = this.getTranslate();
        transforms.push(translate);
        transforms.forEach(this.addTransform.bind(this));
        this.hide();
    }.bind(this));

    return this;
}


function weird() {
    var translate,
        transforms = this.getTransforms();

    if (this.fan) return console.log("Sorry! Fanning is temporarily out of order.");

    // transforms.forEach(this.addTransform.bind(this));

    window.requestAnimationFrame(function() {
        transforms.forEach(this.addTransform.bind(this));
        window.requestAnimationFrame(function() {
            this.addTransform(this.getTranslate()).hide();
        }.bind(this));
    }.bind(this));

    return this;
}