<?php
require "conn.php";
$user_name = "zwuckert";
$id_roweru = 21;
$id_stacji = 1;
$mysql_qry = "SELECT login FROM wypozyczenia WHERE login='$user_name';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) == 0) {
	$zapytanie1 = "UPDATE uzytkownik SET wypozyczenia=wypozyczenia + 1 WHERE login='$user_name';";
	$zapytanie2  = "INSERT INTO wypozyczenia (login, id_roweru, czas) VALUES ('$user_name', '$id_roweru', CURRENT_TIMESTAMP);";
	$zapytanie3 = "UPDATE stacja SET wolne_miejsca=wolne_miejsca + 1 WHERE id_stacji='$id_stacji';";
	mysqli_query($conn, $zapytanie1);
	mysqli_query($conn, $zapytanie2);
	mysqli_query($conn, $zapytanie3);
	echo "tak";

}else{
	echo "Już masz wypożyczony rower. Nie możesz wypożyczyć kolejnego. Pierw oddaj tamten";
}
?>