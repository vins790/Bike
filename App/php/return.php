<?php
require "conn.php";
$login = $_POST["login"];
$id_stacji = $_POST["id_stacji"];
$id_roweru = $_POST["id_roweru"];
$mysql_qry = "SELECT id_roweru FROM wypozyczenia WHERE login='$login';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) == 0) {
	echo "Nie masz żadnego wypożyczonego roweru zarejestrowanego przez Nasz system :c";
}else{
	$zapytanie1  = "SELECT TIMESTAMPDIFF(MINUTE, NOW(), (select czas from wypozyczenia where login='$login')) diff;";
	$result2 = mysqli_query($conn, $zapytanie1);
	$row = mysqli_fetch_assoc($result2);      
	if($row[diff] > 30){
		$wynik = $row[diff];
		$wynik /= 60;
		$wynik += 1;
		$wynik = floor($wynik);
		$wynik *= 2;
		$zapytanie5 = "UPDATE uzytkownik SET saldo=saldo - $wynik WHERE login='$login';";
		mysqli_query($conn, $zapytanie5);
	}
	$zapytanie2  = "DELETE FROM wypozyczenia WHERE login='$login';";	
	$zapytanie3 = "UPDATE stacja SET wolne_miejsca=wolne_miejsca - 1 WHERE id_stacji=$id_stacji;";
	$zapytanie4 = "UPDATE zapiecia SET id_stacji=$id_stacji WHERE id_zapiecia='$id_roweru';";
	mysqli_query($conn, $zapytanie2);
	mysqli_query($conn, $zapytanie3);
	mysqli_query($conn, $zapytanie4);
	
	echo "Oddałeś rower! Super. Dziękujemy za przejażdżkę i do zobaczenia wkrótce!";
}
?>