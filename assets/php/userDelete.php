<?php
include 'connect.php';
        $id=$_POST['Uname'];
        if( $mysqli->query("DELETE FROM uzytkownik WHERE login=$id") ) { }
        if( $mysqli->query("DELETE FROM konto WHERE login=$id") ) { }
        if( $mysqli->query("DELETE FROM admin WHERE login=$id") ) { }
?>