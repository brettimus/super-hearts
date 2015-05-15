module.exports = {
    events: null,
    initialize: function initialize(elt) {
        this.events.click = this.onclick.bind(this);
        this.events.touchend = this.ontouch.bind(this);
        elt.addEventListener("click", this.events.click);
        elt.addEventListener("touchend", this.events.touchend);
    },
    onclick: function onclick(e) {
        throw new Error("Must define onclick");
    },
    ontouch: function ontouch(e) {
        throw new Error("Must define ontouch");
    },
    remove: function remove(selector) {
        var elt = document.querySelector(selector);
        Object.keys(this.events).forEach(function(eventName) {
            elt.removeEventListener(eventName, this.events[eventName]);
        }, this);
    },
};