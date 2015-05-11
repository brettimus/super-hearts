// TODO
// make this smaller! it does too much

// TODO
// switch to only using utils module...
var utils = require("../utilities"),
    square = utils.square,
    toRadians = utils.toRadians,
    randomAngle = utils.randomAngle,
    randomOpacity = utils.randomOpacity,
    randomScalar = utils.randomScalar,
    randomInRange = utils.randomInRange;

/*** Note ***/
// assigning `null` out the gate speeds up future assignments.
// the performance gain is probably neglible...
// BUT I ONLY HAVE ONE SPEED 
// AND IT IS OPTIMAL
/*** End of Note ***/
module.exports = {
    "_SCALAR": null,
    "_THETA": null,
    angleRange: null,
    fanHearts: null,
    floatingInSpace: null,
    geyser: null,
    heartColor: null,
    heartsCount: null,
    image: null,
    imageSrc: null,
    opacityRange: null,
    rotateHearts: null,
    scalarRange: null,
    transformOrigin: null,
    transitionDuration: null,
    transitionFunction: null,
    translateXRange: null,
    translateYRange: null,
    x: null,
    y: null,
    addTransform: function addTransform(operation) {
        this.image.style["-webkit-transform"] += operation;
        this.image.style["-ms-transform"]     += operation;
        this.image.style.transform            += operation;
        return this;
    },
    appendToBody: function appendToBody() {
        document.querySelector("body").appendChild(this.image);
        return this;
    },
    animate: function animate() {
        var translate,
            transforms = [
                this.getScale(1), // apparently this helps for scaling on an iPad? haven't checked tbh
                this.getRotate(),
                this.getScale(),
            ];

        // TODO - clean this logick up. yuckie.
        if (!this.fanHearts) {
            transforms.forEach(this.addTransform.bind(this));
        }
        window.requestAnimationFrame(function() {
            if (this.fanHearts) {
                transforms.forEach(this.addTransform.bind(this));
            }
            this.addTransform(this.getTranslate()).fadeOut();
        }.bind(this));

        return this;
    },
    fadeOut: function fadeOut() {
        var removeHeart = this.remove.bind(this);
        this.image.style.opacity = 0;
        setTimeout(removeHeart, this.transitionDuration);
        return this;
    },
    remove: function remove() {
        document.querySelector("body").removeChild(this.image);
        return this;
    },
    getAngle: function getAngle() {
        // normalize the angle for consistency
        var theta;
        if (!this.rotateHearts) return 0;
        if (typeof this._THETA !== "number") {
            theta = randomAngle(this.angleRange[0], this.angleRange[1]);
            while (theta < 0) { theta += 360; }
            theta = theta % 360;
            this._THETA = theta;
        }
        return this._THETA;
    },
    getRotate: function getRotate(theta) {
        if (theta === undefined) theta = this.getAngle();
        return "rotate("+theta+"deg)";
    },
    getScalar: function getScalar() {
        if (typeof this._SCALAR !== "number") {
            this._SCALAR = randomScalar(this.scalarRange[0], this.scalarRange[1]);
        }
        return this._SCALAR;
    },
    getScale: function getScale(k) {
        if (k === undefined) k = this.getScalar();
        return "scale("+k+")";
    },
    getStyle: function getStyle() {
        var left       = (this.x - this.image.width/2),
            top        = (this.y - this.image.height/2),
            opacity    = randomOpacity(this.opacityRange[0], this.opacityRange[1]);
        return [
            "left:"+left+"px",
            "opacity:"+opacity,
            "position:fixed",
            "pointer-events:none",
            "top:"+top+"px",
            "transform-origin:"+this.transformOrigin,
            "-webkit-transform-origin:"+this.transformOrigin,
            "-ms-transform-origin:"+this.transformOrigin,
            "transition: "+this.getTransition(),
            "-moz-transition: "+this.getTransition(),
            "-webkit-transition: "+this.getTransition(),
        ].join(";");
    },
    getTransition: function getTransition() {
        return this.transitionDuration+"ms "+ this.transitionFunction;
    },
    getTranslate: function getTranslate() {
        // TODO: separate this into translateX and translateY
        var tx = randomInRange(this.translateXRange),
            ty = -randomInRange(this.translateYRange);

        if (this.floatingInSpace) return this.spaceyTranslate(tx, ty);

        return "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
    },
    setCoordinates: function setCoordinates(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    setImage: function setImage() {
        this.image = document.createElement("img");
        this.image.src = this.imageSrc;
        return this;
    },
    show: function show() {
        this.image.style.cssText += this.getStyle();
        this.appendToBody();
        return this;
    },
    // TODO
    // this is a fixer-upper...
    spaceyTranslate: function spaceyTranslate(tx, ty) {
        var angle = this.getAngle(),
            translateLength = Math.sqrt(square(tx) + square(ty));
        tx = translateLength * Math.sin(toRadians(angle));
        ty = translateLength * Math.cos(toRadians(angle));

        if      (angle >= 0   && angle < 90)  { ty *= -1;  }
        else if (angle >= 90  && angle < 180) { /* pass */ }
        else if (angle >= 180 && angle < 270) { tx *= -1;  }
        else                                  { tx *= -1; ty *= -1;  }

        return  "translate("+tx/this.getScalar()+"px,"+ty/this.getScalar()+"px)";
    }

};