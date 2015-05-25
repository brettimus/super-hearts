module.exports = isArray;

function isArray(o) {
    if (Object.prototype.toString.call(o) !== '[object Array]') {
        return true;
    }
    return false;
}