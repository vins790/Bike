<?php
include 'connect.php';
        $dataArray=json_decode(stripslashes($_POST['array']));
        $faultID=$dataArray[0];
        $servisID=$dataArray[1];
            if($data = $mysqli->query("UPDATE awarie SET status=2 WHERE awarie.id_awarii=$faultID")) {    
            }
            if($data = $mysqli->query("INSERT INTO przypisania_awarii(id_awarii, id_serwis) VALUES($faultID, $servisID)")) {
            }
?>