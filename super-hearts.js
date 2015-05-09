var SuperHearts = (function() {

    var DEFAULTS = {
        blastRange: [60, 80],
        floatingInSpace: false,
        heartDelay: 0,
        heartsCount: [18, 22],
        imageSrc: "./heart-icon-1.svg",
        opacityRange: [0.10, 1.00],
        rotateHearts: true,
        scalarRange: [0.50, 2.00],
        transformOrigin: "center center",
        transitionDuration: 300,
        transitionFunction: "ease-out",
    };

    var heartProto = {
        blastRange: null,
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
        add: function add() {
            document.querySelector("body").appendChild(this.image);
        },
        animate: function animate(next) {
            // move the heart!

            var rotate = "rotate("+this.angle+"deg)",
                rotate_back = "rotate("+(-this.angle)+"deg)",
                scale = "scale("+randomScalar(this.scalarRange[0], this.scalarRange[1])+")",
                translate,
                transforms = [
                    "scale(1)",
                    rotate,
                    scale,
                ],
                l = randomInRange(this.blastRange[0], this.blastRange[1]),
                angle,
                theta,
                tx,
                ty;

            this.image.style.cssText += "transform:" + transforms.join(" ") + ";";
            this.image.style.cssText += "-webkit-transform:" + transforms.join(" ") + ";";
            this.image.style.cssText += "-ms-transform:" + transforms.join(" ") + ";";

            setTimeout(function() {
                if (this.floatingInSpace) {
                    angle = this.angle;
                    theta = angle*(Math.PI/180);
                    tx = l * Math.sin(theta);
                    ty = l * Math.cos(theta);
                    if (angle > 0 && angle <= 90)         { ty *= -1;  }
                    else if (angle > 90 && angle <= 180)  { /* pass */ }
                    else if (angle > 180 && angle <= 270) { tx *= -1;  }
                    else {
                        tx *= -1;
                        ty *= -1;
                    }
                    translate = "translate("+tx + "px, " + ty +"px)"
                    this.image.style["-webkit-transform"] += translate;
                    this.image.style["-ms-transform"]     += translate;
                    this.image.style.transform            += translate;
                } else {
                    translate = "translate("+ 0 + "px, " + -l +"px)";
                    this.image.style["-webkit-transform"] += translate;
                    this.image.style["-ms-transform"]     += translate;
                    this.image.style.transform            += translate;
                }
                this.hide();
            }.bind(this), 1);
            return this;
        },
        hide: function hide(next) {
            this.image.style.opacity = 0;
            if (typeof next === "function") next();
            else {
                setTimeout(function() {
                    this.remove();
                }.bind(this), this.transitionDuration);
            }
            return this;
        },
        remove: function remove() {
            document.querySelector("body").removeChild(this.image);
            return this;
        },
        show: function show() {
            var left       = (this.x - this.image.width/2),
                top        = (this.y - this.image.height/2),
                opacity    = randomOpacity(this.opacityRange[0], this.opacityRange[1]),
                initStyles = [
                    "left:"+left+"px",
                    "opacity:"+opacity,
                    "position:fixed",
                    "pointer-events:none",
                    "top:"+top+"px",
                    "transform-origin:"+this.transformOrigin,
                    "-webkit-transform-origin:"+this.transformOrigin,
                    "-ms-transform-origin:"+this.transformOrigin,
                    "transition: "+this.transitionDuration+"ms "+ this.transitionFunction,
                    "-moz-transition: "+this.transitionDuration+"ms "+ this.transitionFunction,
                    "-webkit-transition: "+this.transitionDuration+"ms "+ this.transitionFunction,
                ];

            this.image.style.cssText += initStyles.join(";");
            this.add();
            return this;
        },
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
            if (heart.rotateHearts) {
                heart.angle = randomAngle();
            } else {
                heart.angle = 0;
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
    function randomAngle() {
        return randomInRange(0, 360);
    }
    function randomOpacity(a, b) {
        return randomInRange(a*100, b*100)/100;
    }
    function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*100, b*100)/100;
    }
    function randomInRange(a, b) {
        return Math.floor(Math.random()*b + a);
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