var B = require("boots-utils");

Range.RangeHundredths = RangeHundredths;
module.exports = Range;

function Range(data) {
    this.dispatch(data);
}

Range.prototype.get = function() {
    return B.array.randomInArray(this.data);
};


Range.prototype.dispatch = function dispatch(data, dataType) {
    var setters = {
            'number': this._primitive,
            'string': this._primitive,
            'array': this._array,
            'object': this._object,
        };
    this.data = setters[this.type(data)](data);
    return this;
};

Range.prototype._primitive = function _primitive(n) {
    return [n];
};

Range.prototype._array = function _array(ary) {
    return B.array.range(ary[0], ary[1]);
};

Range.prototype._object = function _object(o) {
    if (o.sample) this.get = o.sample;
    return o.data;
};

Range.prototype.type = function type(v) {
    if (B.array.isArray(v)) {
        return "array";
    } else {
        return typeof v;
    }
};

/**
 * This is suuuper messy right now. 
 * @constructor 
 */
function RangeHundredths(data) {
    Range.call(this, data);
    if (this.type(data) === "array") {
        this.get = newGet;
    }
}
RangeHundredths.prototype = Object.create(Range.prototype);

RangeHundredths.prototype._array = function(ary) {
    return B.array.range(ary[0]*100, ary[1]*100);
};

function newGet() {
    return Range.prototype.get.call(this) / 100;
}