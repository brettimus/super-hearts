var B = require("boots-utils"),
    BooTemplate = require("boo-templates"),
    assert = B.test.assert;
var Animator = require("../src/js/animator");

var a = new Animator(),
    p;

var notSelfTemplate = new BooTemplate("Animator#{{method}} did not return self");
var notQueuedTemplate = new BooTemplate("Animator#{{method}} failed to add {{type}}."); // todo - include expected and actual

var stylesCount = 0,
    transformsCount = 0;

p = a._styles.length === stylesCount;
assert(p, "Animator initialized incorrect number of styles. ("+a._styles.length+")");

p = a._transforms.length === transformsCount;
assert(p, "Animator initialized incorrect number of transforms. ("+a._transforms.length+")");


p = a.opacity(1) === a;
assert(p, notSelf("opacity"));

stylesCount++;
p = a._styles.length === stylesCount;
assert(p, notQueued("opacity", "style"));


p = a.position("fixed") === a;
assert(p, notSelf("position"));

stylesCount++;
p = a._styles.length === stylesCount;
assert(p, notQueued("position", "style"));


p = a.rotate(90) === a;
assert(p, notSelf("rotate"));

transformsCount++;
p = a._transforms.length === transformsCount;
assert(p, notQueued("rotate", "transform"));


p = a.scale(1.1) === a;
assert(p, notSelf("scale"));

transformsCount++;
p = a._transforms.length === transformsCount;
assert(p, notQueued("scale", "transform"));


p = a.translate(10, 10, 10) === a;
assert(p, notSelf("translate"));

transformsCount += 1;
p = a._transforms.length === transformsCount;
assert(p, notQueued("translate", "transform"));


p = a.transitionDuration(400) === a;
assert(p, notSelf("transitionDuration"));

stylesCount++;
p = a._styles.length === stylesCount;
assert(p, notQueued("transitionDuration", "style"));


console.log(a.print());

// var z = new Animator({
//     rotate: [120, 400],
//     scale: [1, 100],
//     translateX: [60, 80],
//     translateY: [-80, -60],
//     translateZ: [-10, 10],
//     transition: 600,
// });

function notSelf(method) {
    return notSelfTemplate.compile({method: method});
}

function notQueued(method, type) {
    return notQueuedTemplate.compile({
        method: method,
        type: type,
    });
}
