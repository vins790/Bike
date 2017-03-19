<?php
include 'connect.php';

        if( $data = $mysqli->query("SELECT id_serwis FROM serwisanci") ) {
            while ($row = $data->fetch_assoc()) { 
                echo '<tr id="';
                echo $row['id_serwis'];
                echo '"><td>#<span>';
                echo $row['id_serwis'];
                echo "</span></td></tr>";
            }
            $data->close();
        }
         
?>