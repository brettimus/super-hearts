var B = require("boots-utils");


var Range = require("./range"),
    Animator = require("./animator"),
    HeartImage = require("./heart-image");

module.exports = AnimationCollection;

/**
 * Object returned by SuperHearts
 * @constructor
 */
function AnimationCollection() {
    this.animations = [];
}

/**
 * Adds an animation
 * @method
 */
AnimationCollection.prototype.add = function add(animation) {
    this.animations.push(animation);
    return this;
};

AnimationCollection.prototype.animate = function animate(elt, x, y) {
    this.animations.forEach(function(a) {
        var o = a.options;
        var times = a.count.get();
        var current = a.start;
        var startX = x - (o.imageWidth/2),
            startY = y - (o.imageHeight/2);

        current.clear();
        current
            .position("fixed")
            .x(0)
            .y(0)
            .transformOrigin("center center")
            .translate(startX, startY)
            .opacity(o.opacity)
            .rotate(o.angle)
            .scale(o.scalar);

        B.nTimes(times, function() {
            console.log(a.options);
            var img = new HeartImage(elt, "", a.options);
            img.addStyle(current.print());
            img.show();

            window.requestAnimationFrame(function() {
                var styles = current.next.printNonTransforms(),
                    transforms = current.next._compileTransforms();

                img.addStyle(styles)
                    .addTransform(transforms);
            });

            function _animate(current) {
                return function() {
                    var styles = current.printNonTransforms(),
                        transforms = current._compileTransforms();

                    img.addStyle(styles)
                        .addTransform(transforms);
                };
            }

        });
    });
};