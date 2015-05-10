// possible code smell: transition and transform related methods return strings instead of doing the operation themselves
// (it is kind of inconsistent with the methods that return `this`)
var SuperHearts = (function() {
    var HEART_IMAGE = 'data:image/svg+xml;charset=utf-8,<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: #B91319;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';
    var DEFAULTS = {
        angleRange: [0, 360],
        blastRange: [60, 80],
        fanHearts: false,
        floatingInSpace: false,
        heartDelay: 0,
        heartsCount: [18, 22],
        imageSrc: HEART_IMAGE,
        opacityRange: [0.10, 1.00],
        rotateHearts: true,
        scalarRange: [0.50, 2.00],
        transformOrigin: "center center",
        transitionDuration: 300,
        transitionFunction: "ease-out",
    };

    var heartProto = {
        angleRange: null,
        blastRange: null,
        fanHearts: null,
        floatingInSpace: null,
        heartDelay: null,
        heartsCount: null,
        image: null,
        imageSrc: null,
        opacityRange: null,
        rotateHearts: null,
        scalarRange: null,
        transformOrigin: null,
        transitionDuration: null,
        transitionFunction: null,
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
        },
        animate: function animate() {
            // move the heart!
            var translate,
                transforms = [
                    this.scale(1), // apparently this helps for scaling on an iPad? haven't checked tbh
                    this.rotate(),
                    this.scale(),
                ];

            // TODO - clean this logick up. yuckie.
            if (!this.fanHearts) {
                transforms.forEach(this.addTransform.bind(this));
            }
            window.requestAnimationFrame(function() {
                if (this.fanHearts) {
                    transforms.forEach(this.addTransform.bind(this));
                }
                this.addTransform(this.translate()).fadeOut();
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
        rotate: function rotate(theta) {
            if (theta === undefined) theta = this.angle;
            return "rotate("+theta+"deg)";
        },
        scale: function scale(k) {
            if (k === undefined) k = randomScalar(this.scalarRange[0], this.scalarRange[1]);
            return "scale("+k+")";
        },
        show: function show() {
            this.image.style.cssText += this.style();
            this.appendToBody();
            return this;
        },
        style: function style() {
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
                "transition: "+this.transition(),
                "-moz-transition: "+this.transition(),
                "-webkit-transition: "+this.transition(),
            ].join(";");
        },
        transition: function transition() {
            return this.transitionDuration+"ms "+ this.transitionFunction;
        },
        translate: function translate() {
            var angle,
                theta,
                tx,
                ty,
                translateLength = randomInRange(this.blastRange[0], this.blastRange[1]);

            tx = 0;
            ty = -translateLength;

            if (this.floatingInSpace) {
                angle = this.angle;
                theta = angle*(Math.PI/180);
                tx = translateLength * Math.sin(theta);
                ty = translateLength * Math.cos(theta);
                if      (angle > 0 && angle <= 90)    { ty *= -1;  }
                else if (angle > 90 && angle <= 180)  { /* pass */ }
                else if (angle > 180 && angle <= 270) { tx *= -1;  }
                else                                  { tx *= -1; ty *= -1;  }
            }

            return "translate("+tx + "px," + ty +"px)";
        }
    };

    function result(selector, options) {
        var elt    = document.querySelector(selector),
            config = _extend({}, heartProto, DEFAULTS, options),
            a      = config.heartsCount[0],
            b      = config.heartsCount[1];

        function heartFactory(x, y) {
            var heart = Object.create(config);
            heart.x = x;
            heart.y = y;
            heart.image = document.createElement("img");
            heart.image.src = heart.imageSrc;
            heart.angle = 0;
            if (heart.rotateHearts) {
                heart.angle = randomAngle(heart.angleRange[0], heart.angleRange[1]);
            }
            return heart;
        }

        function spewHeart(x,y) {
            return function() {
                heartFactory(x, y).show().animate();
            };
        }
        function onclick(e) {
            var count = randomInRange(a, b),
                x = e.pageX,
                y = e.pageY;
            for (var i = 0; i < count; i++) {
                setTimeout(window.requestAnimationFrame(spewHeart(x, y)), config.heartDelay*i);
            }
        }
        function ontouch(e) {
            var count = randomInRange(a,b),
                x = e.changedTouches[0].pageX,
                y = e.changedTouches[0].pageY;
            for (var i = 0; i < count; i++) {
                setTimeout(window.requestAnimationFrame(spewHeart(x, y)), config.heartDelay*i);
            }
        }
        
        elt.addEventListener("click", onclick);
        elt.addEventListener("touchend", ontouch);
    }

    /***********/
    /* Helpers */
    /***********/
    function randomAngle(a, b) {
        return randomInRange(a, b);
    }
    function randomOpacity(a, b) {
        return randomInRange(a*100, b*100)/100;
    }
    function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*100, b*100)/100;
    }
    function randomInRange(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

    function _extend() {
        // extends an arbitrary number of objects
        var args   = [].slice.call(arguments, 0),
            result = args[0];
        for (var i=1; i < args.length; i++) {
            result = _extend2(result, args[i]);
        }
        return result;
    }
    function _extend2(destination, source) {
        // thanks angus kroll
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
              destination[k] = source[k];
            }
        }
        return destination;
    }

    return result;
})();