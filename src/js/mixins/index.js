var rotate = require("./rotate"),
    scale = require("./scale"),
    transition = require("./transition"),
    translate = require("./translate"),
    animate = require("./animate");

module.exports = {
    animate: animate,
    rotate: rotate,
    scale: scale,
    transition: transition,
    translate: translate,
};


// var fs              = require("fs"),
//     path            = require("path"),
//     files           = ["rotate","scale"];

// function normalizeFileName(name) {
//     return path.basename(name, path.extname(name));
// }

// function isNotCurrentFile(file) {
//     return file !== normalizeFileName(module.filename);
// }

// function exportMixin(name) {
//     module.exports[name] = require(name);
// }

// module.exports = (function() {
//     files.filter(isNotCurrentFile).forEach(exportMixin);
// })();