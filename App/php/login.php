<?php
require "conn.php";
$user_name = $_POST["user_name"];
$user_pass = $_POST["password"];
$mysql_qry = "SELECT * FROM konto WHERE login='$user_name' and haslo='$user_pass'; ";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {
	echo "Zalogowany";
}else{
	printf("Nie udało się :c");
}
?>