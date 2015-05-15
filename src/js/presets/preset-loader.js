var buttonDefaults  = require("./button"),
    circleDefaults  = require("./circle"),
    lineDefaults    = require("./line"),
    geyserDefaults  = require("./geyser");

module.exports = function loadPresets(SuperHearts) {
    SuperHearts.registerPreset("Button", buttonDefaults);
    SuperHearts.registerPreset("Circle", circleDefaults);
    SuperHearts.registerPreset("Line", lineDefaults);
    SuperHearts.registerPreset("Geyser", geyserDefaults);
};

