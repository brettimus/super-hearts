// TODO
// - divide translation by scalar?
// - allow blur config
// - cache existing animations
// - let user specify numbers + arrays for options
// - rename configs

var SuperHearts = (function() {
    var HEART_IMAGE = 'data:image/svg+xml;charset=utf-8,<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="87.501px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501" xml:space="preserve"><path style="fill: %FILL%;" d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"/></svg>';
    var DEFAULTS = {
        angleRange: [0, 359],
        fanHearts: false,
        floatingInSpace: false,
        geyser: false,
        heartsCount: [6, 10],
        heartColor: "#B91319",
        imageSrc: HEART_IMAGE,
        opacityRange: [0.10, 0.75],
        rotateHearts: true,
        scalarRange: [0.15, 0.45],
        transformOrigin: "center center",
        transitionDuration: 400,
        transitionFunction: "ease-out",
        translateXRange: [0, 0],
        translateYRange: [15, 45],
    };

    var heartProto = {
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

    function initialize(selector, options) {
        var elt       = document.querySelector(selector),
            config    = extend({}, heartProto, DEFAULTS, options),
            eltRect   = elt.getBoundingClientRect(),
            geyserX   = eltRect.left + ((eltRect.width) / 2),
            geyserY   = eltRect.top + (eltRect.height / 2);

        // TODO put this somewhere else... this is sloppy
        config.imageSrc = config.imageSrc.replace("%FILL%", config.heartColor);

        if (config.geyser) {
            geyser();
        }
        else {
            elt.addEventListener("click", onclick);
            elt.addEventListener("touchend", ontouch);
        }

        function heartFactory(x, y) {
            var heart = Object.create(config);
            heart.x = x;
            heart.y = y;
            heart.image = document.createElement("img");
            heart.image.src = heart.imageSrc;
            return heart;
        }

        function spewHeart(x,y) {
            return function() {
                heartFactory(x, y).show().animate();
            };
        }

        function spewHearts(x,y) {
            var count = randomInRange(config.heartsCount);
            for (var i = 0; i < count; i++) {
                window.requestAnimationFrame(spewHeart(x, y));
            }
        }

        function onclick(e) {
            var x = e.pageX,
                y = e.pageY;
            spewHearts(x, y);
        }

        function ontouch(e) {
            var x = e.changedTouches[0].pageX,
                y = e.changedTouches[0].pageY;
            spewHearts(x, y);
        }

        // TODO - clean up, use requestAnimationFrame
        function geyser() {
            console.log(eltRect);
            config.geyserInterval = config.geyserInterval || config.transitionDuration/2;
            setInterval(function(){
                spewHearts(geyserX, geyserY);
            }, config.geyserInterval);
        }
    }

    function argumentsHelper() {
        var args = [].slice.call(arguments[0]), // NB this call to `arguments[0]` is weird but i like being able to pass in another function's args
            result = {
                selector: "body",
                optionsArray: [],
            };

        if (typeof args[0] === "string") {
            result.selector = args[0];
            result.optionsArray = args.slice(1);
        }
        else {
            result.optionsArray = args.slice(0);
        }
        return result;
    }

    /* All the ways you can call this function */
    /* SuperHearts() */
    /* SuperHearts(selector) */
    /* SuperHearts(options) */
    /* SuperHearts(options1, options2, ...) */
    /* SuperHearts(selector, options) */
    /* SuperHearts(selector, options1, options2, ...) */
    /* aaaand SuperHearts.PRESET */
    function result() {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // TODO
        // refactor. this is ugly
        if (optionsArray.length > 0) {
            optionsArray.forEach(function(options) {
                initialize(selector, options);
            });
        } else {
            initialize(selector, {});
        }


        return {
            compose: function compose(options) {
                initialize(selector, options);
                return this;
            }
        };
    }

    function presetHandler(presetDefaults) {
        var args         = argumentsHelper(arguments),
            selector     = args.selector,
            optionsArray = args.optionsArray;

        // TODO - test this?
        //        We are merging user options _after_ preset defaults so they can override at their leisure!
        optionsArray.forEach(function(options, index) {
            optionsArray[index] = extend({}, presetDefaults, options);
        });

        return result.apply(result, [selector].concat(optionsArray));
    }

    result.Line = function Line() {
        var lineDefaults = {
                rotateHearts: false,
                transitionDuration: 650,
                translateXRange: [-60, 60]
            };

        return presetHandler(lineDefaults);
    };

    result.Geyser = function Geyser() {
        var geyserDefaults = {
                angleRange: [-10, 10],
                geyser: true,
                geyserInterval: 200,
                heartsCount: [1,1],
                opacityRange: [0.3, 0.6],
                scalarRange: [0.20, 0.25],
                transitionDuration: 800,
                translateXRange: [-45, 45],
                translateYRange: [30, 60]
            };

        return presetHandler(geyserDefaults);
    };

    /***********/
    /* Helpers */
    /***********/
    function square(x) {
        return x*x;
    }
    function toRadians(theta) {
        while (theta < 0) { theta += 360; }
        return (theta % 360)*(Math.PI / 180);
    }
    function randomAngle(a, b) {
        return randomInRange(a, b);
    }
    function randomOpacity(a, b) {
        return randomInRange(a*100, b*100)/100;
    }
    function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*100, b*100)/100;
    }
    // TODO - clean this up
    function randomInRange(a, b) {
        var args = [].slice.call(arguments);
        if (args.length === 1) {
            if (args[0].length < 2) throw new Error("a range array must have two values");
            a = args[0][0];
            b = args[0][1];
        }
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

    function extend() {
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