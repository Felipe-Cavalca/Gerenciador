<?php

include '../core/variaveis.php';
include '../core/funcoes.php';
include '../core/msgDiscord.php';
include '../core/banco.php';

if(validaLogin()){
    $retorno= [
        'status' => true,
        'msg' => "Logado"
    ];
}else{
    $retorno= [
        'status' => false,
        'msg' => "Parece que você não está logado"
    ];
}

echo json_encode($retorno, true);