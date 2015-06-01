var Animator = require("./animator");

module.exports = SuperHearts;

function SuperHearts(options) {
    var a = new Animator(options),
        prop;

    console.log(a);
    this.a = a;
}