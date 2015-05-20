var extend = require("../../../utilities/extend");
var base = require("./events-base");

var proto = {
    onclick: function onclick(e) {
        var x = e.pageX,
            y = e.pageY;
        this.spewHearts(x, y);
    },
    ontouch: function ontouch(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        this.spewHearts(x, y);
    },
};

module.exports = extend({}, base, proto);