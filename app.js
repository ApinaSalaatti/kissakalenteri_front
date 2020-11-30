// variables YEAR and BACKEND come from env.js

var WIDTH = 0;
var HEIGHT = 0;
var CALENDAR_ORIGINAL_WIDTH = 0;
var CALENDAR_ORIGINAL_HEIGHT = 0;
var LOGO_ORIGINAL_WIDTH = 0;
var WINDOW_DEFAULT_SIZE = 100;

var RESOURCES_LOADED = false;
var DATA_LOADED = false;

var WINDOWS = [
	{ x: 0.43, y: 0.34, size: 1 },
	{ x: 0.81, y: 0.45, size: 1 },
	{ x: 0.41, y: 0.53, size: 1 },
	{ x: 0.69, y: 0.14, size: 1 },
	{ x: 0.69, y: 0.31, size: 1 },
	{ x: 0.45, y: 0.15, size: 1, target: "itsenaisyys.php" },
	{ x: 0.10, y: 0.16, size: 1 },
	{ x: 0.59, y: 0.67, size: 1 },
	{ x: 0.46, y: 0.71, size: 1 },
	{ x: 0.20, y: 0.70, size: 1 }, // 10
	{ x: 0.33, y: 0.15, size: 1 },
	{ x: 0.82, y: 0.68, size: 1 },
	{ x: 0.08, y: 0.33, size: 1 },
	{ x: 0.09, y: 0.68, size: 1 },
	{ x: 0.30, y: 0.69, size: 1 },
	{ x: 0.21, y: 0.33, size: 1 },
	{ x: 0.57, y: 0.25, size: 1 },
	{ x: 0.81, y: 0.26, size: 1 },
	{ x: 0.21, y: 0.14, size: 1 },
	{ x: 0.14, y: 0.51, size: 1 },
	{ x: 0.25, y: 0.53, size: 1 },
	{ x: 0.71, y: 0.55, size: 1 },
	{ x: 0.33, y: 0.35, size: 1 },
	{ x: 0.55, y: 0.46, size: 1.2, target: "aatto.php" }
];

var IMAGE_DISPLAYED = false;

function setData(key, value) {
    if(!window.localStorage) return;

	window.localStorage.setItem(key, value);
}
function getData(key) {
    if(!window.localStorage) return null;

	return window.localStorage.getItem(key);
}
function removeData(key) {
    if(!window.localStorage) return;

	window.localStorage.removeItem(key);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}

function canSeeWindow(day) {
    //return true;
    var dateObj = new Date();
    dateObj.setUTCHours(dateObj.getUTCHours() + 2);
    var currYear = dateObj.getUTCFullYear();
    var currMonth = dateObj.getUTCMonth() + 1;
    var currDay = dateObj.getUTCDate();
    if(YEAR < currYear) { // Viewing last years' calendar?
        return true;
    }
    if(currMonth == 12) { // Gotta be christmas month!
        if(day <= currDay) {
            return true;
        }
    }
    return false;
}

function centerElement(elem) {
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;

    elem.style.left = x + "px";
    elem.style.top = y + "px"; 
}

function positionLoadingIndicator() {
    centerElement(document.getElementById("loading-indicator"));
}

function blur() {
    document.getElementById("background-blurrer").style.display = "block";
}
function unblur() {
    document.getElementById("background-blurrer").style.display = "none";
}

function showLoading() {
    document.getElementById("loading-indicator").style.display = "block";
}
function hideLoading() {
    document.getElementById("loading-indicator").style.display = "none";
}

function createWindows() {
    for(var i = 0; i < WINDOWS.length; i++) {
        var d = i+1;

        var specialTarget = WINDOWS[i].target ? 'target="' + WINDOWS[i].target + '"' : '';

        var bg = getData("day-opened-" + d) == "true" ? "url('" + BACKEND + "" + YEAR + "/" + d + "/thumb')" : "";
        var windowStr = '<div ' + specialTarget + ' class="calendar-window" window-day="' + d + '"><span class="calendar-number">' + d + '</span></div>';
        var elem = createElementFromHTML(windowStr);

        elem.style.backgroundImage = bg;
        document.getElementById("calendar-image").appendChild(elem);

        WINDOWS[i].element = elem;

        elem.addEventListener("click", function() {
            var day = this.getAttribute("window-day");
            var t = this.getAttribute("target");
            if(canSeeWindow(day)) {
                setData("day-opened-" + day, "true");
                this.style.backgroundImage = "url('" + BACKEND + "" + YEAR + "/" + day + "/thumb')";

                if(t) {
                    window.location = t;
                    return;
                }

                blur();
                showLoading();
                var display = document.getElementById("image-display");
                var shown = document.getElementById("shown-image");
                if(shown) {
                    display.removeChild(shown);
                }
                var i = new Image();
                i.id = "shown-image";
                i.src = BACKEND + YEAR + "/" + day;
                i.onload = function() {
                    IMAGE_DISPLAYED = true;
                    if(i.width > WIDTH - 20) {
                        // Make smaller with width
                        i.style.width = (WIDTH - 20) + "px";
                    }
                    else if(i.height > HEIGHT - 20) {
                        // Make smaller with height
                        i.style.height = (HEIGHT - 20) + "px";
                    }
                    display.style.display = "block";
                    display.appendChild(i);
                    centerElement(display);
                    hideLoading();
                };
            }
        });
    }
}

function positionWindows(multiplier) {
    for(var i = 0; i < WINDOWS.length; i++) {
        var w = WINDOWS[i];
        var s = WINDOWS[i].size || 1;
        w.element.style.left = (CALENDAR_ORIGINAL_WIDTH * w.x * multiplier) + "px";
        w.element.style.top = (CALENDAR_ORIGINAL_HEIGHT * w.y * multiplier) + "px";
        w.element.style.width = (WINDOW_DEFAULT_SIZE * multiplier * s) + "px";
        w.element.style.height = (WINDOW_DEFAULT_SIZE * multiplier * s) + "px";
    }
}

function closeCurrentWindow() {
    if(!IMAGE_DISPLAYED) return;

    IMAGE_DISPLAYED = false;
    var display = document.getElementById("image-display");
    display.style.display = "none";
    unblur();
}

function positionAndResizeCalendar() {
    var i = document.getElementById("calendar-image");

    var maxWidth = WIDTH;
    
    if(i.offsetWidth > maxWidth || maxWidth <= CALENDAR_ORIGINAL_WIDTH) {
        // Need to resize the calendar
        i.style.width = maxWidth + "px";
    }

    var sizePercent = i.offsetWidth / CALENDAR_ORIGINAL_WIDTH;

    i.style.height = (CALENDAR_ORIGINAL_HEIGHT * sizePercent) + "px";

    var w = i.offsetWidth;
    var h = i.offsetHeight;
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;
    x = Math.max(x, 0);
    y = Math.max(y, 0);


    i.style.left = x + "px";
    i.style.top = y + "px";

    positionWindows(sizePercent);

    var elems = document.getElementsByClassName("calendar-window");
    for(var i = 0; i < elems.length; i++) {
        var nw = WIDTH < 700 ? "2em" : "3em";
        elems[i].style.fontSize = nw;
    }
}

function resourcesDone() {
    RESOURCES_LOADED = true;
    isEverythingLoaded();
}
function dataDone() {
    DATA_LOADED = true;
    isEverythingLoaded();
}

function isEverythingLoaded() {
    if(!RESOURCES_LOADED || !DATA_LOADED) return;

    hideLoading();
    unblur();
}

function onResize() {
    showLoading();
    WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    HEIGHT = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var l = document.getElementById("logo-image");
    if(l.offsetWidth > WIDTH) {
        l.style.width = WIDTH + "px";
    }
    else {
        var w = Math.min(LOGO_ORIGINAL_WIDTH, WIDTH);
        l.style.width = w + "px";
    }

    positionLoadingIndicator();
    positionAndResizeCalendar();

    hideLoading();
}

var interval = 1000 / 60;
var SKICAT = document.getElementById("skicat");
var skicatStop = false;
function skicatUpdate() {
    if(skicatStop) return;

    var x = SKICAT.offsetLeft;
    x += 1;
    if(x > WIDTH + 120) x = -120;
    SKICAT.style.left = x + "px";
    window.setTimeout(skicatUpdate, interval);
}

function skicatClicked() {
    if(skicatStop) return;

    skicatStop = true;

    document.getElementById("skicat-bubble").style.left = (SKICAT.offsetLeft - 140) + "px";
    document.getElementById("skicat-bubble").style.top = (SKICAT.offsetTop - 120) + "px";
    document.getElementById("skicat-bubble").style.zIndex = 200;
    document.getElementById("skicat-bubble").style.display = "block";

    window.setTimeout(skicatStartAgain, 2000);
}

function skicatStartAgain() {
    document.getElementById("skicat-bubble").style.display = "none";
    skicatStop = false;
    skicatUpdate();
}

function initialize() {
    blur();
    window.addEventListener("resize", onResize);

    CALENDAR_ORIGINAL_HEIGHT = document.getElementById("calendar-image").offsetHeight;
    CALENDAR_ORIGINAL_WIDTH = document.getElementById("calendar-image").offsetWidth;
    LOGO_ORIGINAL_WIDTH = document.getElementById("logo-image").offsetWidth;

    createWindows();

    window.addEventListener("load", resourcesDone);

    onResize();

    dataDone();

    document.getElementById("image-closer").addEventListener("click", closeCurrentWindow);
    document.getElementById("background-blurrer").addEventListener("click", closeCurrentWindow);

    SKICAT.addEventListener("click", skicatClicked);
    skicatUpdate();

    document.getElementById("cornercat").addEventListener("mouseenter", function() { document.getElementById("info-bubble").style.display = "block"; });
    document.getElementById("cornercat").addEventListener("mouseleave", function() { document.getElementById("info-bubble").style.display = "none"; });
}

initialize();