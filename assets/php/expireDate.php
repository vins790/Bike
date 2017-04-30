<?php
include 'connect.php';

$id   = $_POST['postBikeID'];
$date = $_POST['postDate'];
$sqlDate = date('Y-m-d',strtotime($date));

        if($mysqli->query("UPDATE rower SET dataWaznosci = '{$sqlDate}' WHERE rower.id_roweru = $id") ) {
            $mysqli->close();
        }     
?>