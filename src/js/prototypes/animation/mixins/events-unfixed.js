var extend = require("../../../utilities/extend");
var base = require("./events-base");

var proto = {
    onclick: function onclick(e) {
        var x = e.clientX,
            y = e.clientY;
        this.spewHearts(x, y);
    },
    ontouch: function ontouch(e) {
        var x = e.changedTouches[0].clientX,
            y = e.changedTouches[0].clientY;
        this.spewHearts(x, y);
    },
};

module.exports = extend({}, base, proto);