var B = require("boots-utils"),
    assert = B.test.assert;

var Animation = require("./animation"),
    Animator = require("./animator");

var z = new Animator();

z.position("fixed")
    .x(0)
    .y(0)
    .translate(100, 100)
    .rotate(90)
    .scale(1.5)
    .opacity(0.6)
    .transition(700);

var a = new Animation([1,2], z);