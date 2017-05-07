<?php
include 'connect.php';
$id=$_POST['id'];
$array = array();
        if( $data = $mysqli->query("SELECT id_awarii FROM przypisania_awarii WHERE id_serwis=$id") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row; 
            }
        header('Content-Type: application/json');
        echo json_encode($array);
        $data->close();
        }
         
?>