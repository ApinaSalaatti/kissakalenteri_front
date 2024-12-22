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

if(validDate(2024, 24)) {
?>
<!DOCTYPE html>
<html lang="fi">
	<head>
		<title>Mauhtavaa joulua 2024!</title>
		<meta charset="UTF-8"/>
		<meta property="fb:admins" content="576790613" />
		<meta property="fb:admins" content="663968960" />
		<meta property="og:image" content="http://www.kissakalenteri.fi/fb_share.jpg" />
		<meta property="og:title" content="Kissakalenteri 2024!" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="http://kissakalenteri.fi/" />
		<meta property="og:description" content="Joulukalenteri kissoille ja kissanmielisille!" />
		<meta property="fb:app_id" content="555856014752587" />
		
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Kissakalenteri 2024!" />
		<meta name="twitter:description" content="Joulukalenteri kissoille ja kissanmielisille!" />
		<meta name="twitter:image:src" content="http://www.kissakalenteri.fi/fb_share.jpg" />
		
		<link type="text/css" rel="stylesheet" href="aattoStyles.css" />
		<link rel="shortcut icon" href="favicon.ico">
    </head>
    <body>
		<div id="behind-content">
			<div id="second-bg">
				<div id="main-content">
                <img src="images/aattoLogo.png" id="logo-image" />
                
                <div id="background-blurrer"></div>

                <div id="image-display">
                    <div id="image-closer">X</div>
                    <img id="main-image" />
				</div>

                <div id="image-listing">
                    <img src="images/seuraajat_logo.png" id="seuraajat-logo" />

                </div>

				<div id="cat-music">
					<audio autoplay controls>
						<source src="audio/aattoBiisi.mp3" type="audio/mpeg">
						Selaimesi ei tue musiikkia. Et kuule kissamusiikkia. :(
					</audio>
				</div>
			</div>
		</div>
		</div>
		
		<script>
			<?php
				$imageData = "[";
				// Generate info on aatto images
				$imagesFolder= "images/aatto/images/";
				$files = scandir($imagesFolder);
				foreach ($files as $f) {
					if($f == "." || $f == "..") {
						continue;
					}

					$path = $imagesFolder . $f;
					$size = getimagesize($path);
					$imageData .= json_encode([ "image" => $path, "thumb" => $path, "width" => $size[0], "height" => $size[1] ]) . ",";
				}
				$imageData .= "]";
			?>

			var IMAGES = <?php echo $imageData; ?>
		</script>
		
		<script src="aattoScript.js"></script>
    </body>
</html>
<?php 
}
?>