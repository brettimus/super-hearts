var buttonDefaults  = require("./button"),
    circleDefaults  = require("./circle"),
    compassDefaults = require("./compass"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser");

module.exports = function loadPresets(SuperHearts) {
    SuperHearts.registerPreset("Button", buttonDefaults);
    SuperHearts.registerPreset("Compass", compassDefaults);
    SuperHearts.registerPreset("Circle", circleDefaults);
    SuperHearts.registerPreset("Line", lineDefaults);
    SuperHearts.registerPreset("Geyser", geyserDefaults);
};

