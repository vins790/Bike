<?php
require "conn.php";
$user_name = "Torak123";//$_POST["user_name"];
$mysql_qry = "SELECT saldo FROM uzytkownik WHERE login='$user_name';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);   
	echo $row[saldo];
} else {
	echo "0 results";
}?>