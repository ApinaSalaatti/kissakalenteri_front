<?php
require_once "upload_config.php";

function createFilename($originalFilename) {
    $parts = pathinfo($originalFilename);
    
    // Remove some offending characters just to be sure
    $filename = str_replace(" ", "_", $parts['filename']);
    $filename = str_replace("/", "_", $filename);
    $filename = str_replace("\\", "_", $filename);
    
    $filename = time() . $filename; // Add a timestamp to prevent name clashes

    $filename = iconv('utf-8', 'ascii//TRANSLIT', $filename); // Had a problem with scandics before, so let's just strip those bad boys away (along with any other non-ascii character!)
    
    // Limit to 50 chars
    $filename = substr($filename, 0, 50);
    
    // Maybe someone is uploading a file with a bogus file extension? Cut it's length at least
    if(isset($parts['extension'])) {
        $extension = "." . substr($parts['extension'], 0, 10);
    }
    else {
        // Extensionless file, it seems
        $extension = '';
    }
    
    return $filename . $extension;
}

function check_upload() {
    global $files_path;

    if(isset($_FILES["cat"]) && isset($_FILES["cat"]["name"])) {
        $f = $_FILES["cat"];

        if(!isset($f["tmp_name"]) || empty($f["tmp_name"])) {
            return false;
        }

        if(disk_free_space($files_path) < 100000000) {
            unlink($_FILES["cat"]["tmp_name"]);
            return false;
        }

        if($f["size"] == 0) {
            return false;
        }

        $mime = mime_content_type($f["tmp_name"]);
        if ($mime != "image/jpeg" && $mime != "image/png") {
            return false;
        }
    }

    return true;
}

try {
    if(check_upload()) {
        if(isset($_FILES["cat"]) && isset($_FILES["cat"]["name"])) {
            $target = $files_path . createFilename($_FILES["cat"]["name"]);
            move_uploaded_file($_FILES["cat"]["tmp_name"], $target);
            if(isset($_POST["info"])) {
                file_put_contents($target . ".txt", $_POST["info"]);
            }
        }
        else if(isset($_POST["info"])) {
            $target = $files_path . createFilename("feedback.txt");
            file_put_contents($target, $_POST["info"]);
        }
    }
    else {
        http_response_code(404);
    }
} catch(Exception $e) {
    http_response_code(404);
} catch(Throwable $e) {
    http_response_code(404);
}