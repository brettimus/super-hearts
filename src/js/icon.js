var SVG = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="%BLUR%" result="blurry" /><feMerge><feMergeNode in="SourceGraphic"></feMergeNode><feMergeNode in="blurry"></feMergeNode></feMerge></filter><g id="heart" style="filter:url(#blur); "><path style="fill: %FILL%; %STYLES%" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></g></svg>';

module.exports = Icon;

function Icon(fill, blur, styles) {
    this.fill = fill || "#B91319";
    this.blur = blur || 0;
    this.styles = styles || "";
    this.src = src(this.fill, this.blur, this.styles);
}

function src(fill, blur, styles) {
    var icon = SVG.replace("%FILL%", fill).replace("%BLUR%", blur).replace("%STYLES%", styles),
        result = 'data:image/svg+xml;charset=utf-8,'+icon;
    return result;
}