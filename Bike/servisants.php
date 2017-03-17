<?php
include 'connect.php';

        if( $data = $mysqli->query("SELECT id_serwis FROM serwisanci") ) {
            while ($row = $data->fetch_assoc()) { 
                echo '<tr><td>#<span id="s';
                echo $row['id_serwis'];
                echo '">';
                echo $row['id_serwis'];
                echo "</span></td></tr>";
            }
            $data->close();
        }
         
?>