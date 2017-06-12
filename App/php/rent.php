<?php
require "conn.php";
$login = $_POST["login"];
$id_roweru = $_POST["id_roweru"];
$id_stacji = $_POST["id_stacji"];
$mysql_qry = "SELECT login FROM wypozyczenia WHERE login='$login';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) == 0) {
	$zapytanie1 = "UPDATE uzytkownik SET wypozyczenia=wypozyczenia + 1 WHERE login='$login';";
	$zapytanie2  = "INSERT INTO wypozyczenia (login, id_roweru, czas) VALUES ('$login', '$id_roweru', CURRENT_TIMESTAMP);";
	$zapytanie3 = "UPDATE stacja SET wolne_miejsca=wolne_miejsca + 1 WHERE id_stacji='$id_stacji';";
	$zapytanie4 = "UPDATE zapiecia SET id_stacji = NULL WHERE id_zapiecia=$id_roweru;";
	mysqli_query($conn, $zapytanie1);
	mysqli_query($conn, $zapytanie2);
	mysqli_query($conn, $zapytanie3);
	mysqli_query($conn, $zapytanie4);
	echo "Wypożyczyłeś rower! Oddaj go w przeciągu 30 minut  nic nie zapłacisz! Potem 2zł za każdą godzinę. Miłego dnia :)";

}else{
	echo "Już masz wypożyczony rower. Nie możesz wypożyczyć kolejnego. Pierw oddaj tamten";
}
?>