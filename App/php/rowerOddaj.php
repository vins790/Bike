<?php
require "conn.php";
$login = $_POST["login"];
$mysql_qry = "Select id_roweru from wypozyczenia where login='$login';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result); 
	echo $row[id_roweru];
}else{
	echo "Nie wypożyczyłeś roweru";
}
?>