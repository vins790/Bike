<?php
include 'connect.php';
        $id=$_POST['fault'];
            if($data = $mysqli->query("SELECT id_serwis FROM przypisania_awarii WHERE id_awarii=$id")) {
                $row = $data->fetch_row(); 
                echo $row[0];
            }
            $data->close();
?>