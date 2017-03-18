<?php
include 'connect.php';

        if( $data = $mysqli->query("SELECT id_roweru FROM rower") ) {
            $temp=0;
            while ($row = $data->fetch_assoc()) { 
                echo '<tr><td>#<span id="';
                echo $row['id_roweru'];
                echo '">';
                echo $row['id_roweru'];
                echo "</span></td></tr>";
            }
            $data->close();
        }
         
?>