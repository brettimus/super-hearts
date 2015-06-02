var B = require("boots-utils"),
    nTimes = B.nTimes;

var Animator = require("./animator"),
    Icon = require("./icon"),
    Image = require("./image"),
    Range = require("./range");

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

/**
 * Todo - make this pass off some responsibilities... It's a monster!
 */
AnimationCollection.prototype.animate = function animate(elt, x, y, starter) {
    this.animations.forEach(function(a) {
        this._animate(a, elt, x ,y ,starter);
    }, this);
};


AnimationCollection.prototype._animate = function(a, elt, x, y, starter) {
    var o = a.options;
    var times = a.count.get();
    var current = a.start;
    var k = o.scalar || 1;

    var icon;
    if (!o.imageSrc) {
        icon = new Icon(o.color, o.blur);
        o.imageSrc = icon.src;
        o.imageHeight = icon.height;
        o.imageWidth = icon.width;
    }

    var startX = x,
        startY = y;
    if (o.imageWidth)
        startX -= o.imageWidth/2;
    if (o.imageHeight)
        startY -= o.imageHeight/2;



    current
        .clear()  // Resets queues
        .position("fixed")
        .x(0)
        .y(0)
        .transformOrigin("center center")
        .translate(startX, startY)
        .opacity(o.opacity)
        .rotate(o.rotate)
        .scale(k);

    nTimes(times, function() {

        var img = new Image(elt, "", o);
        img.style(current.print())
            .show();

        window.requestAnimationFrame(function() {
            var styles     = current.next.printNonTransforms(),
                transforms = current.next._compileTransforms();

            img.style(styles).transform(transforms);
        });

    });
};