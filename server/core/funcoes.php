<?php

function pr($data) {
    echo "<pre>" . print_r($data, true) . "</pre>";
}

function validaLogin(){
    session_start();

    if(isset($_SESSION['usuario'])){
        return true;
    }else{
        return false;
    }

}