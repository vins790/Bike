<?php
include 'connect.php';
        $id=$_POST['fault'];
        if( $data = $mysqli->query("SELECT id_serwis FROM przypisania_awarii WHERE id_awarii=$id") ) {
            $row = $data->fetch_row();
            if($row[0]){
                echo $row[0];
            }
        }
        if( $mysqli->query("DELETE FROM awarie WHERE id_awarii=$id") ) { }
        if( $mysqli->query("DELETE FROM przypisania_awarii WHERE id_awarii=$id") ) { }
?>