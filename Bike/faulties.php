<?php
include 'connect.php';

        if( $data = $mysqli->query("SELECT id_awarii, status FROM awarie") ) {
            while ($row = $data->fetch_assoc()) { 
                echo '<tr><td>#<span id="f';
                echo $row['id_awarii'];
                echo '">';
                echo $row['id_awarii'] ;
                
                if($row['status'] == 1){
                    echo '</span></td><td><i class="fa fa-circle" aria-hidden="true" id="red"></i>';
                }else if($row['status'] == 0){
                    echo '</span></td><td><i class="fa fa-circle" aria-hidden="true" id="green"></i>';
                }else {
                    echo '</span></td><td><i class="fa fa-circle" aria-hidden="true" id="yellow"></i>';
                }
                
                echo "</td></tr>";
            }
            $data->close();
        }
         
?>