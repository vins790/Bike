<?php
include 'connect.php';
        $id=$_POST['fault'];
        if( $mysqli->query("DELETE FROM awarie WHERE id_awarii=$id") ) {
            echo "Usunieto";
        }else{
            echo "Coś nie tak.";
        }
?>