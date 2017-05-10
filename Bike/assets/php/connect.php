<?php

//DANE DOSTĘPOWE
$server = 'sebastianfurmanczyk.pl';
$user = 'sebastia_projekt';
$pass = 'zaqwerty123';
$db = 'sebastia_projekt';

// Nawiązywanie połączenia
$mysqli = new mysqli($server, $user, $pass, $db);
mysqli_report(MYSQLI_REPORT_ERROR);
?>