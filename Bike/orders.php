<?php
include 'connect.php';

        $id=$_POST['id'];
        if( $data = $mysqli->query("SELECT id_awarii FROM przypisania_awarii WHERE id_serwis=$id") ) {
            while ($row = $data->fetch_assoc()) { 
                echo '<tr id="';
                echo $row['id_awarii'];
                echo '"><td>#<span>';
                echo $row['id_awarii'];
                echo "</span></td></tr>";
            }
            $data->close();
        }
         
?>