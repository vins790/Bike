<?php
include 'connect.php';
$id=$_POST['servis'];
        if($data = $mysqli->query("SELECT COUNT(id_awarii) FROM przypisania_awarii WHERE id_serwis=$id")) {
            $row = $data->fetch_row();
            echo $row[0]; 
        }
?>