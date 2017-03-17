<?php
include 'connect.php';

        if( $data = $mysqli->query("SELECT login FROM konto") ) {
            while ($row = $data->fetch_assoc()) { 
                echo "<tr><td>";
                echo $row['login'];
                echo "</td></tr>";
            }
            $data->close();
        }
         
?>