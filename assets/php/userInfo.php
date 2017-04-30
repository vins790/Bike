<?php
include 'connect.php';
$id = $_POST['userID'];
$array = [];
        if( $data = $mysqli->query("SELECT imie, nazwisko, saldo FROM konto inner join uzytkownik WHERE konto.login = '$id' and uzytkownik.login = '$id'") ) {
            while ($row = $data->fetch_array(MYSQL_ASSOC)) { 
                $array[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($array);
            $data->close();
        }
         
?>