<?php
include 'connect.php';
$id = $_POST['bikeID'];
$array = [];
        if( $data = $mysqli->query("SELECT czy_sprawny, id_zapiecia, dataPrzegladu, dataWaznosci FROM rower WHERE id_roweru = $id") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($array);
            $data->close();
        }
         
?>