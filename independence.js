function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}

var flakes = [];
function rain() {
	var removeAt = -1;
	for(var i = 0; i < flakes.length; i++) {
		flakes[i].pos += 1;
		flakes[i].elem.style.top = flakes[i].pos + "px";
		
		if(flakes[i].pos > HEIGHT - 65)
			removeAt = i;
	}
	
	if(removeAt > -1) {
		var e = flakes[removeAt].elem;
		e.remove();
		flakes.splice(i, 1);
	}
	
	window.setTimeout(rain, 1000/30);
}

function addFlake() {
	var elem = createElementFromHTML('<div id="snowflake"></div>');
	document.body.append(elem);
	var xPos = Math.random() * (WIDTH - 65);
	elem.style.left = xPos + "px";
	elem.style.top = -100 + "px";
	
	flakes.push( { 'elem': elem, 'pos': -100 } );
	window.setTimeout(addFlake, 2000);
}

function centerElement(elem) {
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;

    elem.style.left = x + "px";
    elem.style.top = y + "px"; 
}

var WIDTH = 0;
var HEIGHT = 0;

var IMAGE_ORIGINAL_HEIGHT = 0;
var IMAGE_ORIGINAL_WIDTH = 0;

function onResize() {
	WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	HEIGHT = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	
	var i = document.getElementById("independence-cat");

	var maxWidth = WIDTH;
    var maxHeight = HEIGHT - 150; // take into account the logo and the bottom area with music controls etc

	// Reset width and height
    i.style.removeProperty("width");
	i.style.removeProperty("height");
    
    if(i.offsetWidth > maxWidth || maxWidth <= IMAGE_ORIGINAL_WIDTH) {
        // Need to resize the calendar
        i.style.width = maxWidth + "px";
    }
    
    var sizePercent = i.offsetWidth / IMAGE_ORIGINAL_WIDTH;
    i.style.height = (IMAGE_ORIGINAL_HEIGHT * sizePercent) + "px";

    // Now that width is good, we check if the height needs to be adjusted also
    if(i.offsetHeight > maxHeight) {
        i.style.height = maxHeight + "px";
        sizePercent = i.offsetHeight / IMAGE_ORIGINAL_HEIGHT;
        i.style.width = (IMAGE_ORIGINAL_WIDTH * sizePercent) + "px";
    }

    centerElement(i);

}

function initialize() {
	IMAGE_ORIGINAL_HEIGHT = document.getElementById("independence-cat").offsetHeight;
	IMAGE_ORIGINAL_WIDTH = document.getElementById("independence-cat").offsetWidth;

	onResize();
}

initialize();
window.addEventListener("resize", onResize);
addFlake();
rain();