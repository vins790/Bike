<?php
require "conn.php";
$login = $_POST["login"];
$saldo = $_POST["saldo"];

$zapytanie1  = "Update uzytkownik set saldo = saldo + $saldo where login='$login';";
mysqli_query($conn, $zapytanie1);
	
echo "Dodałeś pienądzę do swojego konta! Dziękujemy za zaufanie :)";
?>