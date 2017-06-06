<?php
require "conn.php";
$login = $_POST["login"];
$id_roweru = $_POST["id_roweru"];
$id_stacji = $_POST["id_stacji"];
$mysql_qry = "SELECT id_roweru FROM wypozyczenia WHERE login='$login';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) == 0) {
	echo "Nie masz żadnego wypożyczonego roweru zarejestrowanego przez Nasz system :c";
}else{
	$zapytanie2  = "DELETE FROM wypozyczenia WHERE login='$login';";	
	$zapytanie3 = "UPDATE stacja SET wolne_miejsca=wolne_miejsca - 1 WHERE id_stacji=$id_stacji;";
	mysqli_query($conn, $zapytanie2);
	mysqli_query($conn, $zapytanie3);
	echo "Oddałeś rower! Super. Dziękujemy za przejażdżkę i do zobaczenia wkrótce!";
}
?>