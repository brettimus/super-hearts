// Desired API:
// SuperHearts("#clicker", options)
// options = {
//   blastNoise: 0,
//   blastRadius: 75,
//   heartsCount: [10, 20],
//   imageSrc: "./heart.png",
//   scalarRange: [],
//   transitionDuration: "300ms",
//   transitionFunction: ease-in-out,
// }

var SuperHearts = (function() {

    // NB:
    // DEAFULTS gets mixed into heartProto...
    var DEFAULTS = {
        blastRange: [60, 80],
        heartsCount: [15, 22],
        imageSrc: "./heart.png",
        scalarRange: [0.2, 1.2],
        transitionDuration: 300,
        transitionFunction: "ease-in-out",
    };

    var heartProto = {
        blastRange: null,
        heartsCount: null,
        image: null,
        imageSrc: null,
        scalarRange: null,
        x: null,
        y: null,
        animate: function animate(next) {
            // move the heart!

            var rotate = "rotate("+this.angle+"deg)",
                scale = "scale("+randomScalar(this.scalarRange[0], this.scalarRange[1])+")",
                transforms = [
                    "scale(1)",
                    rotate,
                    scale,
                ];

            var l = randomInRange(this.blastRange[0], this.blastRange[1]),
                angle = this.angle,
                theta = angle*(Math.PI/180),
                tx = l * Math.sin(theta),
                ty = l * Math.cos(theta);

            if (angle > 0 && angle <= 90)         { ty *= -1;  }
            else if (angle > 90 && angle <= 180)  { /* pass */ }
            else if (angle > 180 && angle <= 270) { tx *= -1;  }
            else {
                tx *= -1;
                ty *= -1;
            }
            this.image.style.cssText += "transform:" + transforms.join(" ") + ";";
            this.image.style.cssText += "-webkit-transform:" + transforms.join(" ") + ";";

            setTimeout(function() {
                this.image.style.transform += "translate("+tx + "px, " + ty +"px)";
                this.image.style["-webkit-transform"] += "translate("+tx + "px, " + ty +"px)";
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
            var left = (this.x-this.image.width/2),
                opacity = randomOpacity(),
                top = (this.y-this.image.height/2),
                initStyles = [
                    "left:"+left+"px",
                    "opacity:"+opacity,
                    "position:fixed",
                    "pointer-events:none",
                    "top:"+top+"px",
                    "transform-origin:bottom center",
                    "transition: "+this.transitionDuration+"ms "+ this.transitionFunction
                ];

            this.image.style.cssText += initStyles.join(";");
            document.querySelector("body").appendChild(this.image);
            return this;
        },
    };

    function heartFactory(x, y) {
        var result = Object.create(heartProto);
        result.x = x;
        result.y = y;
        result.image = document.createElement("img"); // dims: 50x44
        result.image.src = result.imageSrc;

        result.angle = randomAngle();

        return result;
    }

    function result(selector, options) {
        var config = _extend(heartProto, DEFAULTS, options);
        var a = config.heartsCount[0],
            b = config.heartsCount[1];

        function spewHeart(x,y) {
            return function() {
                heartFactory(x, y).show().animate();
            };
        }
        function onclick(e) {
            var count = randomInRange(a,b);
            for (var i = 0; i < count; i++) {
                setTimeout(spewHeart(e.pageX, e.pageY), config.heartDelay*2);
            }
        }
        function ontouch(e) {
            var count = randomInRange(a,b),
                x = e.originalEvent.touches[0].pageX,
                y = e.originalEvent.touches[0].pageY;
            for (var i = 0; i < count; i++) {
                setTimeout(spewHeart(x, y), config.heartDelay*2);
            }
        }
        document
            .querySelector(selector)
            .addEventListener("click", onclick)
            .addEventListener("touchstart", ontouch);
    }

    // helpers
    function randomAngle() {
        return randomInRange(0, 360);
    }
    function randomOpacity() {
        return randomInRange(0, 100)/100;
    }
    function randomScalar(a, b) { // assumes we're working with tenths...
        return randomInRange(a*10, b*10)/10;
    }
    function randomInRange(a, b) {
        return Math.floor(Math.random()*b + a);
    }

    // thanks angus kroll
    function _extend2(destination, source) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
              destination[k] = source[k];
            }
        }
        return destination;
    }
    function _extend() {
        var args = [].slice.call(arguments, 0),
            result = args[0];
        for (var i=1; i < args.length; i++) {
            result = _extend2(result, args[i]);
        }
        return result;
    }

    return result;
})();

SuperHearts("body", {
    heartDelay: 0,
    transitionDuration: 600,
    transitionFunction: "ease-out"
});