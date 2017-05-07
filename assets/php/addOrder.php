<?php
include 'connect.php';

        $dataArray=json_decode(stripslashes($_POST['array']));
        $faultID=$dataArray[0];
        $servisID=$dataArray[1];
        
        $status = $mysqli->query("SELECT status FROM awarie WHERE awarie.id_awarii=$faultID");
        $row = $status->fetch_row();
            if($row[0] == 1){
                if($data = $mysqli->query("UPDATE awarie SET status=2 WHERE awarie.id_awarii=$faultID")) {    
                }
                if($data = $mysqli->query("INSERT INTO przypisania_awarii(id_awarii, id_serwis) VALUES($faultID, $servisID)")) {
                }
            }
?>