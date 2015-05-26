function randomInRange(ary) {
    var min  = ary[0],
        max  = ary[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function eventFire(el, etype, options){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        extend2(evObj, options);
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}


function extend2(destination, source) {
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}

// Not in use by i enjoyed writing this so it's fucking staying
function nTimes(times, interval, f) {
    var count = 0,
        id = setInterval(function() {
            if (count === times) return clearMe();
            f();
            count++;
        }, interval);

    function clearMe() {
        clearInterval(id);
    }
}