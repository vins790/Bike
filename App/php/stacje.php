<?php
require "conn.php";
$response = array();
$response[id_stacji] = array();
$mysql_qry = "SELECT * FROM stacja;";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {    
	while($row = $result->fetch_array(MYSQLI_NUM)){
		$tmp = array();
		$tmp[0] = $row[0];
		$tmp[1] = $row[1];
		array_push($response[id_stacji], $tmp[0]);
	}
} else {
	echo "0 results";
}
header('Content-Type: application/json');
echo json_encode($response);
?>