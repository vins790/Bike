<?php
require "conn.php";
$user_name = "aaliyah.bailey";
$user_pass = "consequatur";
$mysql_qry = "SELECT * FROM konto WHERE login like '$user_name' and haslo like '$user_pass'; ";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {
	echo " Logowanie ++";
}else{
	echo " Logowanie --";
}

?>