var bigRingDefaults = require("./big-ring"),
    buttonDefaults  = require("./button"),
    buttonBigRingDefaults = require("./button-big-ring"),
    circleDefaults  = require("./circle"),
    compassDefaults = require("./compass"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser");

module.exports = function loadPresets(SuperHearts) {
    SuperHearts.registerPreset("BigRing", bigRingDefaults);
    SuperHearts.registerPreset("Button", buttonDefaults);
    SuperHearts.registerPreset("ButtonBigRing", buttonBigRingDefaults);
    SuperHearts.registerPreset("Compass", compassDefaults);
    SuperHearts.registerPreset("Circle", circleDefaults);
    SuperHearts.registerPreset("Line", lineDefaults);
    SuperHearts.registerPreset("Geyser", geyserDefaults);
};

