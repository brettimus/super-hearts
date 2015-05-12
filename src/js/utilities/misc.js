module.exports = {
    toRadians: function toRadians(theta) {
        return normalizeAngle(theta)*(Math.PI / 180);
    },
    normalizeAngle: normalizeAngle,
};

function normalizeAngle(theta) {
    while (theta < 0) { theta += 360; }
    return theta % 360;
}