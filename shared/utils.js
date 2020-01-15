function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

function findAndRemove(array, property, value) {
    array.forEach(function(result, index) {
      if(result[property] === value) {
        //Remove from array
        array.splice(index, 1);
      }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function resizeDisplay() {
    function isOverflowing(el){
        return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    }
    var eye = document.getElementById("instructions");
    var fontSize = parseInt(eye.style.fontSize);
    var paddingAbove = parseInt(eye.style.paddingTop);

    for (var i=fontSize; i>=0; i--){
        var overflow = isOverflowing(eye);
        if (overflow) {
            fontSize--;
            paddingAbove += 0.41;
            eye.style.fontSize = fontSize + "px";
            eye.style.paddingTop = paddingAbove + "px";
        }
    }
}

function resetDisplay() {
    var eye = document.getElementById("instructions");
    eye.style.fontSize = "125%";
    eye.style.paddingTop = "1pt";
}