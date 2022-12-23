var WIDTH = 0;
var HEIGHT = 0;
var LOGO_ORIGINAL_WIDTH = 900;

var IMAGE_DISPLAYED = false;

var CURRENT_IMAGE = 0;

var IMAGES = [
	{ image: '1.jpg', thumb: '1_t.jpg', width: 1326, height: 2048 } ,
	{ image: '10.jpg', thumb: '10_t.jpg', width: 1504, height: 1475 } ,
	{ image: '11.jpg', thumb: '11_t.jpg', width: 2048, height: 1537 } ,
	{ image: '12.jpg', thumb: '12_t.jpg', width: 1515, height: 2015 } ,
	{ image: '13.png', thumb: '13_t.png', width: 2048, height: 1536 } ,
	{ image: '14.jpg', thumb: '14_t.jpg', width: 280, height: 349 } ,
	{ image: '15.jpg', thumb: '15_t.jpg', width: 960, height: 540 } ,
	{ image: '16.jpg', thumb: '16_t.jpg', width: 1500, height: 2000 } ,
	{ image: '17.jpg', thumb: '17_t.jpg', width: 1537, height: 2048 } ,
	{ image: '18.jpg', thumb: '18_t.jpg', width: 1152, height: 2048 } ,
	{ image: '19.jpg', thumb: '19_t.jpg', width: 1536, height: 2048 } ,
	{ image: '2.jpg', thumb: '2_t.jpg', width: 576, height: 768 } ,
	{ image: '20.jpg', thumb: '20_t.jpg', width: 2048, height: 1537 } ,
	{ image: '21.jpg', thumb: '21_t.jpg', width: 1536, height: 2048 } ,
	{ image: '22.jpg', thumb: '22_t.jpg', width: 1075, height: 1486 } ,
	{ image: '23.jpg', thumb: '23_t.jpg', width: 1536, height: 2048 } ,
	{ image: '3.jpg', thumb: '3_t.jpg', width: 1536, height: 2048 } ,
	{ image: '4.jpg', thumb: '4_t.jpg', width: 1536, height: 2048 } ,
	{ image: '5.jpg', thumb: '5_t.jpg', width: 1152, height: 2048 } ,
	{ image: '6.jpg', thumb: '6_t.jpg', width: 1638, height: 2048 } ,
	{ image: '7.jpg', thumb: '7_t.jpg', width: 1536, height: 2048 } ,
	{ image: '8.jpg', thumb: '8_t.jpg', width: 1445, height: 1445 } ,
	{ image: '9.jpg', thumb: '9_t.jpg', width: 1600, height: 1200 }
];

function blur() {
    document.getElementById("background-blurrer").style.display = "block";
}
function unblur() {
    document.getElementById("background-blurrer").style.display = "none";
}

function closeCurrentWindow() {
    if(!IMAGE_DISPLAYED) return;

    IMAGE_DISPLAYED = false;
    var display = document.getElementById("image-display");
    display.style.display = "none";
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}

function centerElement(elem) {
    var w = elem.offsetWidth;
	var h = elem.offsetHeight;
	
	console.log(WIDTH);
	console.log(w);
    
    var x = (WIDTH - w) / 2;
    var y = (HEIGHT - h) / 2;

    elem.style.left = x + "px";
    elem.style.top = y + "px"; 
}

var flakes = [];
function rain() {
	var removeAt = -1;
	for(var i = 0; i < flakes.length; i++) {
		flakes[i].pos += 1;
		flakes[i].timer += 100/30.0;
		var rot = flakes[i].timer * flakes[i].rotSpeed;

		flakes[i].elem.style.top = flakes[i].pos + "px";
		flakes[i].elem.style.transform = 'rotate(' + rot + 'deg)';
		
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
	var elem = createElementFromHTML('<div class="present"></div>');
	document.body.append(elem);
	var xPos = Math.random() * (WIDTH - 160);
	elem.style.left = xPos + "px";
	elem.style.top = -100 + "px";
	
	flakes.push( { 'elem': elem, 'pos': -100, 'timer': 0, 'rotSpeed': (Math.random() * 10.0) - 5.0 } );
	window.setTimeout(addFlake, 2000);
}

function onResize() {
    WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	HEIGHT = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	
	console.log(WIDTH);

    var l = document.getElementById("logo-image");
    if(l.offsetWidth > WIDTH) {
        l.style.width = WIDTH + "px";
    }
    else {
        var w = Math.min(LOGO_ORIGINAL_WIDTH, WIDTH);
        l.style.width = w + "px";
    }
}

function showImage(index) {
	if(index > IMAGES.length -1) {
		index = 0;
	}
	else if(index < 0) {
		index = IMAGES.length-1;
	}

	IMAGE_DISPLAYED = true;

	CURRENT_IMAGE = index;
	
	var img = IMAGES[index];
	var fname = img.image;

	var h = img.height;
	var w = img.width;

	if(h > HEIGHT) {
		// Resize by height;
		var percent = HEIGHT / h;
		h = HEIGHT;
		w = percent * w;
	}
	else if(w > WIDTH) {
		// By width
		var percent = WIDTH / w;
		w = WIDTH;
		h = percent * h;
	}

	document.getElementById("main-image").src = "images/aatto/images/" + fname;
	document.getElementById("image-display").style.display = "block";
	document.getElementById("main-image").width = w;
	document.getElementById("main-image").height = h;

	window.setTimeout(function() { centerElement(document.getElementById("main-image")) }, 1);
}

function nextImage() {
	showImage(CURRENT_IMAGE + 1);
}

function createThumb(index) {
	var img = IMAGES[index];

	var parent = document.getElementById("image-listing");
	var e = createElementFromHTML('<img class="list-item" src="images/aatto/thumbs/' + img.thumb + '" />');

	e.addEventListener("click", function() { showImage(index); });

	parent.appendChild(e);
}

function initialize() {
	window.addEventListener("resize", onResize);

	document.getElementById("image-closer").addEventListener("click", closeCurrentWindow);
	document.getElementById("image-display").addEventListener("click", closeCurrentWindow);

	document.getElementById("main-image").addEventListener("click", function(e) {
		e.stopPropagation();
		nextImage();
	});

	for(var i = 0; i < IMAGES.length; i++) {
		createThumb(i);	
	}

	addFlake();
	rain();

	window.setTimeout(onResize, 1);
}

initialize();