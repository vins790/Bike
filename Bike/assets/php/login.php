<?php
require_once "connect.php";

 $log = $_POST['login'];
 $pass  = $_POST['password'];
 
 if( $data = $mysqli->query("SELECT COUNT(*) as rowsFound FROM admin WHERE login='$log'") ) {
    $result =mysqli_fetch_assoc($data);
     
     if( $result['rowsFound'] == 1){
         
         if( $data = $mysqli->query("SELECT haslo FROM konto WHERE login='$log'") ) {
             $result = mysqli_fetch_assoc($data);
             if( $result['haslo'] == $pass){
                echo "OK";    
             }  
         }
    }
 }
?>