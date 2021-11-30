<?php
// Ensure we are on Finnish timezone
date_default_timezone_set("Europe/Helsinki");

function validDate($year, $day) {
	//return true;
	
	$currY = intval(date("Y"));
	$currM = intval(date("m"));
	$currD = intval(date("d"));
	
	// Previous years' stuff is all open
	if($year < $currY) {
		return true;
	}
	else if($year == $currY) {
		// Check that it's December already. :)
		if($currM == 12) {
			// Check that the day is not a FUTURE DAY!
			if($day <= $currD) {
				return true; // YAY!
			}
		}
	}
	
	return false;
}

if(validDate(2021, 6)) {
?>
<!DOCTYPE html>
<html lang="fi">
	<head>
		<title>Hyvää itsenäisyyspäivää 2021!</title>
		<meta charset="UTF-8"/>
		<meta property="fb:admins" content="576790613" />
		<meta property="fb:admins" content="663968960" />
		<meta property="og:image" content="http://www.kissakalenteri.fi/fb_share.jpg" />
		<meta property="og:title" content="Kissakalenteri 2021!" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="http://kissakalenteri.fi/" />
		<meta property="og:description" content="Joulukalenteri kissoille ja kissanmielisille!" />
		<meta property="fb:app_id" content="555856014752587" />
		
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Kissakalenteri 2021!" />
		<meta name="twitter:description" content="Joulukalenteri kissoille ja kissanmielisille!" />
		<meta name="twitter:image:src" content="http://www.kissakalenteri.fi/fb_share.jpg" />
		
		<link type="text/css" rel="stylesheet" href="independenceStyles.css" />
		<link rel="shortcut icon" href="favicon.ico">
    </head>
    <body>
		<div id="behind-content">
			<div id="second-bg">
				<div id="main-content">
					<img src="images/independence_logo.png" id="logo-image" />

					<img src="https://www.kissakalenteri.fi/api/2021/6" id="independence-cat" />

					<div id="cat-music">
						<audio autoplay controls>
							<source src="audio/isammauku.mp3" type="audio/mpeg">
							Selaimesi ei tue musiikkia. Et kuule kissamusiikkia. :(
						</audio>
					</div>

					<div id="bottom"></div>
					
					<div id="fireworks"></div>
					
				</div>
			</div>
		</div>
		
		<script src="independence.js"></script>
    </body>
</html>
<?php 
}
?>