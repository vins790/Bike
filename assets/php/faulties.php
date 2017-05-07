<?php
include 'connect.php';

$array = array();
        if( $data = $mysqli->query("SELECT id_awarii, status FROM awarie") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row;         
            }
            header('Content-Type: application/json');
            echo json_encode($array);
            
            $data->close();
            $mysqli->close();
        }
         
?>