var base = require("./events-base");
var extend = require("../../../utilities/extend");


var proto = {
    onclick: function onclick(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },

    ontouch: function ontouch(e) {
        var elt = e.target;
        var eltRect = elt.getBoundingClientRect(),
            x       = eltRect.left + ((eltRect.width) / 2),
            y       = eltRect.top + (eltRect.height / 2);
        this.spewHearts(x, y);
    },
};

module.exports = extend({}, base, proto);