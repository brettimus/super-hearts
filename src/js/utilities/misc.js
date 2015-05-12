module.exports = {
    square: function square(x) {
        return x*x;
    },
    toRadians: function toRadians(theta) {
        while (theta < 0) { theta += 360; }
        return (theta % 360)*(Math.PI / 180);
    },
};