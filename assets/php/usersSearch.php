<?php
include 'connect.php';

$log = $_POST["log"];
$array = array();

        if( $data = $mysqli->query("SELECT login FROM konto WHERE login like '%$log%' ORDER BY login") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($array);
            $data->close();
        }
         
?>