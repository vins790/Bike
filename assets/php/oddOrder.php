<?php
include 'connect.php';
        
$faultID=$_POST['id'];
        if($id=$mysqli->query("SELECT id_serwis FROM przypisania_awarii WHERE id_awarii=$faultID")){
            if(!is_null($id)){  
                $row = $id->fetch_row();
                echo $row[0];
                 $mysqli->query("UPDATE awarie SET status=1 WHERE awarie.id_awarii=$faultID");
                 $mysqli->query("DELETE FROM przypisania_awarii WHERE przypisania_awarii.id_awarii=$faultID");
            }
        }
?>