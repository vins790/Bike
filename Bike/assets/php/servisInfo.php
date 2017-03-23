<?php
include 'connect.php';
        $id=$_POST['servis'];
            if($data = $mysqli->query("SELECT imie, nazwisko, mail FROM konto WHERE login=(SELECT login FROM serwisanci WHERE id_serwis=$id)")) {
                while ($row = $data->fetch_assoc()) { 
                    header('Content-Type: application/json');
                    echo json_encode($row);
                }
                $data->close();
            }
?>