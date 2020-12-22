var WIDTH = 0;
var HEIGHT = 0;
var LOGO_ORIGINAL_WIDTH = 900;

var IMAGE_DISPLAYED = false;

var CURRENT_IMAGE = 0;

var IMAGES = [
	{ image: "ticru.jpg", thumb: "ticru_t.jpg", width: "450", height: "800" },
	{ image: "terolta.jpg", thumb: "terolta_t.jpg", width: "1000", height: "750" },
	{ image: "Friendly Neighbourhood Cat.jpg", thumb: "Friendly Neighbourhood Cat_t.jpg", width: "900", height: "1200" },
	{ image: "Dr. Mimo.jpg", thumb: "Dr. Mimo_t.jpg", width: "480", height: "640" },
	{ image: "Diablo.jpg", thumb: "Diablo_t.jpg", width: "744", height: "1000" },
	{ image: "Camilla.jpg", thumb: "Camilla_t.jpg", width: "1100", height: "825" },
	{ image: "Allu.jpeg", thumb: "Allu_t.jpeg", width: "1100", height: "618" },
	{ image: "Aino.jpg", thumb: "Aino_t.jpg", width: "1100", height: "825" },
	{ image: "Nicole.png", thumb: "Nicole_t.png", width: "750", height: "1000" },
	{ image: "Nepa.jpg", thumb: "Nepa_t.jpg", width: "750", height: "1000" },
	{ image: "Nelli.jpeg", thumb: "Nelli_t.jpeg", width: "737", height: "640" },
	{ image: "Nappi.jpg", thumb: "Nappi_t.jpg", width: "1100", height: "825" },
	{ image: "Nalle.jpeg", thumb: "Nalle_t.jpeg", width: "828", height: "1000" },
	{ image: "Minni.jpg", thumb: "Minni_t.jpg", width: "750", height: "1000" },
	{ image: "Lotja.jpg", thumb: "Lotja_t.jpg", width: "1100", height: "732" },
	{ image: "Kissa.png", thumb: "Kissa_t.png", width: "709", height: "1000" },
	{ image: "Kismet.jpg", thumb: "Kismet_t.jpg", width: "1080", height: "1080" },
	{ image: "Vieno.jpeg", thumb: "Vieno_t.jpeg", width: "1100", height: "785" },
	{ image: "tuuba.jpeg", thumb: "tuuba_t.jpeg", width: "750", height: "1000" },
	{ image: "Sulo.jpeg", thumb: "Sulo_t.jpeg", width: "1100", height: "787" },
	{ image: "Sarasvati.jpg", thumb: "Sarasvati_t.jpg", width: "1100", height: "825" },
	{ image: "Pumpuli.jpg", thumb: "Pumpuli_t.jpg", width: "541", height: "960" },
	{ image: "Piki.jpg", thumb: "Piki_t.jpg", width: "750", height: "1000" },
	{ image: "Pete.jpg", thumb: "Pete_t.jpg", width: "480", height: "859" },
	{ image: "Pablo ja Elmo.jpg", thumb: "Pablo ja Elmo_t.jpg", width: "744", height: "1000" },
	{ image: "Tuusannuuska.jpeg", thumb: "Tuusannuuska_t.jpeg", width: "486", height: "1000" },
	{ image: "Ryokale.jpeg", thumb: "Ryokale_t.jpeg", width: "562", height: "1000" },
	{ image: "Pippuri ja Sheila.jpeg", thumb: "Pippuri ja Sheila_t.jpeg", width: "768", height: "1024" },
	{ image: "Morokolli.jpeg", thumb: "Morokolli_t.jpeg", width: "486", height: "1000" },
	{ image: "Morrimoykky.jpeg", thumb: "Morrimoykky_t.jpeg", width: "562", height: "1000" }
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

	document.getElementById("main-image").src = "images/aatto/" + fname;
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
	var e = createElementFromHTML('<img class="list-item" src="images/aatto/' + img.thumb + '" />');

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