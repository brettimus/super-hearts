// TODO - construct this from actual SVG file (close!)
//      - look into using an SVG lib instead of xml2js
//
// var fs = require('fs'),
//     xml2js = require('xml2js'),
//     parser = new xml2js.Parser(),
//     builder = new xml2js.Builder();

// fs.readFile(__dirname + '/../icons/heart.svg', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//         console.dir(result.svg.path);
//         // inspect entire object
//         // console.log(util.inspect(result, false, null))
//         console.log('Done');
//         // TODO manipulate object's style...
//         // ...
//         // build object
//         var xml = builder.buildObject(obj);
//     });
// });

// original
// var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';
// module.exports = function(options) {
//     var fill = options.fill,
//         icon = SVG.replace("%FILL%", fill),
//         src = 'data:image/svg+xml;charset=utf-8,'+icon;
//     return src;
// };

// var heartString = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';

// var container = document.createElement("div");
// // container.style.visibility = "hidden";
// container.innerHTML = heartString;
// document.body.appendChild(container);

// var svg = document.querySelector("svg");
// var heart = document.querySelector("svg path");

// // `element` is the element you want to wrap
// var heartParent = heart.parentNode;
// var heartGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
// heartGroup.setAttributeNS("http://www.w3.org/2000/svg", "filter", "url(#blur)");
// // set the wrapper as child (instead of the element)
// heartParent.replaceChild(heartGroup, heart);
// // set element as child of wrapper
// heartGroup.appendChild(heart);

// var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
// svg.appendChild(filter);
// filter.setAttributeNS("http://www.w3.org/2000/svg", "id", "blur");

// var gBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
// filter.appendChild(gBlur);
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "in", "SourceGraphic");
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "stdDeviation", "2");
// gBlur.setAttributeNS("http://www.w3.org/2000/svg", "result", "blurry");

// var merge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
// filter.appendChild(merge);
// var mergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
// // var mergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
// // merge.appendChild(mergeNode2);
// merge.appendChild(mergeNode1);
// mergeNode1.setAttributeNS("http://www.w3.org/2000/svg", "in", "blurry");
// // mergeNode2.setAttributeNS("http://www.w3.org/2000/svg", "in", "SourceGraphic");


var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="%BLUR%" result="blurry" /><feMerge><feMergeNode in="SourceGraphic"></feMergeNode><feMergeNode in="blurry"></feMergeNode></feMerge></filter><g id="heart" style="filter:url(#blur); "><path style="fill: %FILL%; %STYLES%" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></g></svg>';
module.exports = function(options) {
    var fill = options.fill,
        blur = options.blur || 0,
        styles = options.styles || "",
        icon = SVG.replace("%FILL%", fill).replace("%BLUR%", blur).replace("%STYLES%", styles),
        src = 'data:image/svg+xml;charset=utf-8,'+icon;
    return src;
};