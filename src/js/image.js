var B = require("boots-utils");

module.exports = Image;

function Image(container, initStyle, options) {
    this.container = container;
    this.initStyle = initStyle;
    this.image = document.createElement("img");
    this.image.src = options.imageSrc; // icon should be default;
    this.imageHeight = options.imageHeight;
    this.imageWidth = options.imageWidth;
    // TODO - height and width
}

Image.prototype.style = function(style) {
    this.image.style.cssText += style;
    return this;
};

Image.prototype.transform = function(transform) {
    this.image.style.transform += " " + transform;
    this.image.style.webkitTransform += " " + transform;
    return this;
};

Image.prototype.show = function(next) {
    this.image.style.cssText = this.initStyle + this.image.style.cssText;
    this.container.appendChild(this.image);
    if (next) next();
    return this;
};

Image.prototype.hide = function(next) {
    console.log("Image#hide NYI");
    // if (next) next();
    return this;
};

Image.prototype.remove = function(next) {
    this.container.removeChild(this.image);
    if (next) next();
    return this;
};


// animator generated by options
// x and y are set on an event