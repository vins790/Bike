<?php
include 'connect.php';
        $id=$_POST['Uname'];
        $mysqli->query("INSERT INTO admin (login) VALUES ('$id')");
?>