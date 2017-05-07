<<<<<<< HEAD
<?php
include 'connect.php';
        $id=$_POST['bikeID'];
        if( $data = $mysqli->query("SELECT login FROM wypozyczenia WHERE id_rower=$id") ) {
            $row = $data->fetch_row();
            if($row[0]){
                echo $row[0];
            }
        }
        if( $mysqli->query("DELETE FROM wypozyczenia WHERE id_rower=$id") ) { }
=======
<?php
include 'connect.php';
        $id=$_POST['bikeID'];
        if( $data = $mysqli->query("SELECT login FROM wypozyczenia WHERE id_rower=$id") ) {
            $row = $data->fetch_row();
            if($row[0]){
                echo $row[0];
            }
        }
        if( $mysqli->query("DELETE FROM wypozyczenia WHERE id_rower=$id") ) { }
>>>>>>> origin/Marcin
?>