<?php
include 'connect.php';
$array = [];
        if( $data = $mysqli->query("SELECT id_roweru, czy_sprawny, dataPrzegladu, dataWaznosci FROM rower") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($array);
            $data->close();
        }
         
?>