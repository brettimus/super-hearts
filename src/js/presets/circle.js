var extend = require("../utilities/extend");

var defaultMixins = {
    animate: true,
    rotate: true,
    scale: true,
    translate: true,
    transition: true,
};

var circle = {
    angle: [0, 359],
    blur: 0,
    doNotRemove: false,
    fan: false,
    floatingInSpace: false,
    geyser: false,
    count: [5, 8],
    color: "#B91319",
    imageSrc: undefined,
    opacity: [0.10, 0.65],
    scalar: [0.10, 0.35],
    transformOrigin: "center center",
    transitionDuration: 600,
    transitionFunction: "ease-out",
    translateX: [0, 0],
    translateY: [15, 45],
    xNoise: 0,
    yNoise: 0,
};

module.exports = extend(defaultMixins, circle);