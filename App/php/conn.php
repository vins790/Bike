<?php
$db_name = "rentabik_db";
$mysql_username = "rentabik_db";
$mysql_password = "trudnehaslo";
$server_name = "s23.zenbox.pl";
$conn = mysqli_connect($server_name, $mysql_username, $mysql_password, $db_name);
$conn->set_charset("utf8");
?>