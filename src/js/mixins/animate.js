

module.exports = {
    animate: animate,
};

function animate() {
    var translate,
        transforms = this.getTransforms();

    if (this.fan) return console.log("Sorry! Fanning is temporarily out of order.");

    transforms.forEach(this.addTransform.bind(this));
    window.requestAnimationFrame(function() {
        this.addTransform(this.getTranslate()).fadeOut();
    }.bind(this));



    return this;
}

function fanimate() {
    var translate,
        transforms = this.getTransforms();

    window.requestAnimationFrame(function() {
        translate = this.getTranslate();
        transforms.push(translate);
        transforms.forEach(this.addTransform.bind(this));
        // this.addTransform(this.getTranslate()).fadeOut();
        this.fadeOut();
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
            this.addTransform(this.getTranslate()).fadeOut();
        }.bind(this));
    }.bind(this));

    return this;
}