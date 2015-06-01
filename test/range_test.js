var B = require("boots-utils");
var Range = require("../src/js/range");

var nRange = new Range(1),
    aRange = new Range([50, 100]),
    oRange = new Range({ data: ["red", "blue"]});

B.test.assert(nRange.get() === 1, "nRange failed");

B.nTimes(50, function(i) {
    var x = aRange.get();
    B.test.assert(x <= 100 && x >= 50, "aRange failed. Returned "+x);
});

B.nTimes(5, function() {
    var c = oRange.get();
    B.test.assert(c === "red" || c === "blue", "oRange railed. Returned"+c);
});
