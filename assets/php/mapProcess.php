<?php

include 'connect.php';

if($_POST)
{
	$xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'; 
	if (!$xhr){ 
		header('HTTP/1.1 500 Error: Odpowiedz Ajax!'); 
		exit();	
	}
	
	$mLatLang	= explode(',',$_POST["latlang"]);
	$mLat 		= filter_var($mLatLang[0], FILTER_VALIDATE_FLOAT);
	$mLng 		= filter_var($mLatLang[1], FILTER_VALIDATE_FLOAT);
	
	if(isset($_POST["del"]) && $_POST["del"]==true)
	{
		$results = $mysqli->query("DELETE FROM markers WHERE lat=$mLat AND lng=$mLng");
		if (!$results) {  
		  header('HTTP/1.1 500 Error: Nie mo¿na usun¹æ znacznika!'); 
		  exit();
		} 
		exit("Stacja usuniêta");
	}
	
	$mName 		= filter_var($_POST["name"], FILTER_SANITIZE_STRING);
	$mAddress 	= filter_var($_POST["address"], FILTER_SANITIZE_STRING);
	
	$results = $mysqli->query("INSERT INTO markers (name, address, lat, lng) VALUES ('$mName','$mAddress',$mLat, $mLng)");
	if (!$results) {  
		  header('HTTP/1.1 500 Error: Nie mo¿na stworzyæ znacznika!'); 
		  exit();
	} 
	
	$output = '<h1 class="marker-heading">'.$mName.'</h1><p>'.$mAddress.'</p>';
	exit($output);
}


$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers"); 
$parnode = $dom->appendChild($node);


$results = $mysqli->query("SELECT * FROM markers WHERE 1");
if (!$results) {  
	header('HTTP/1.1 500 Error: Nie mo¿na odczytaæ znaczników!'); 
	exit();
} 

header("Content-type: text/xml"); 

while($obj = $results->fetch_object())
{
  $node = $dom->createElement("marker");  
  $newnode = $parnode->appendChild($node);   
  $newnode->setAttribute("name",$obj->name);
  $newnode->setAttribute("address", $obj->address);  
  $newnode->setAttribute("lat", $obj->lat);  
  $newnode->setAttribute("lng", $obj->lng);  	
}

echo $dom->saveXML();
