<?php
include 'connect.php';
        $id=$_POST['fault'];
        if( $data = $mysqli->query("SELECT id_rower, status, opis FROM awarie WHERE id_awarii=$id") ) {
            
            while ($row = $data->fetch_assoc()) { 
                header('Content-Type: application/json');
                echo json_encode($row);
            }
            $data->close();
        }
         
?>