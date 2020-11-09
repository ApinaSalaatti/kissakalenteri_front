// variables YEAR and BACKEND come from env.js

var WIDTH = 0;
var HEIGHT = 0;
var CALENDAR_ORIGINAL_WIDTH = 0;
var CALENDAR_ORIGINAL_HEIGHT = 0;
var WINDOW_DEFAULT_SIZE = 100;

var RESOURCES_LOADED = false;
var DATA_LOADED = false;

var WINDOWS = [
    { x: 0.1, y: 0.15 },
    { x: 0.2, y: 0.5 }
];

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

function positionLoadingIndicator() {
    var ind = document.getElementById("loading-indicator");
    var w = ind.offsetWidth;
    var h = ind.offsetHeight;
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;

    ind.style.left = x + "px";
    ind.style.top = y + "px";
}

function createWindows() {
    for(var i = 0; i < WINDOWS.length; i++) {
        var day = i+1;

        var bg = getData("day-opened-" + day) == "true" ? "background: url('" + BACKEND + "" + YEAR + "/" + day + "/thumb');" : "";

        var windowStr = '<div style="' + bg + '" class="calendar-window" window-day="' + day + '"><span class="calendar-number">' + day + '</span></div>';
        var elem = createElementFromHTML(windowStr);

        document.getElementById("calendar-image").appendChild(elem);

        WINDOWS[i].element = elem;
    }
}

function positionWindows(multiplier) {
    for(var i = 0; i < WINDOWS.length; i++) {
        var w = WINDOWS[i];
        console.log(w);
        w.element.style.left = (CALENDAR_ORIGINAL_WIDTH * w.x * multiplier) + "px";
        w.element.style.top = (CALENDAR_ORIGINAL_HEIGHT * w.y * multiplier) + "px";
        w.element.style.width = (WINDOW_DEFAULT_SIZE * multiplier) + "px";
        w.element.style.height = (WINDOW_DEFAULT_SIZE * multiplier) + "px";
    }
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

    console.log(i.offsetHeight);

    var w = i.offsetWidth;
    var h = i.offsetHeight;
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;
    x = Math.max(x, 0);
    y = Math.max(y, 0);


    i.style.left = x + "px";
    i.style.top = y + "px";

    positionWindows(sizePercent);
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

    document.getElementById("loading-indicator").style.display = "none";
}

function onResize() {
    document.getElementById("loading-indicator").style.display = "block";
    WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    HEIGHT = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    positionLoadingIndicator();
    positionAndResizeCalendar();

    document.getElementById("loading-indicator").style.display = "none";
}

function initialize() {
    window.addEventListener("resize", onResize);

    CALENDAR_ORIGINAL_HEIGHT = document.getElementById("calendar-image").offsetHeight;
    CALENDAR_ORIGINAL_WIDTH = document.getElementById("calendar-image").offsetWidth;

    createWindows();

    window.addEventListener("load", resourcesDone);

    onResize();


    dataDone();
}

initialize();