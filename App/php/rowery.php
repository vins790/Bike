<?php
require "conn.php";
$response = array();
$response[id_stacji] = array();
$id_stacji = $_POST["id_stacji"];
$mysql_qry = "SELECT r.id_roweru FROM rower r, zapiecia z, stacja s WHERE  z.id_zapiecia = r.id_zapiecia AND s.id_stacji = z.id_stacji AND s.id_stacji = '$id_stacji';";
$result = mysqli_query($conn, $mysql_qry);
if (mysqli_num_rows($result) > 0) {    
	while($row = $result->fetch_array(MYSQLI_NUM)){
		$tmp = $row[0];
		array_push($response[id_stacji], $tmp);
	}
} else {
	echo "0";
}
header('Content-Type: application/json');
echo json_encode($response);
?>