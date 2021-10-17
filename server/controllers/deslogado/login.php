<?php

include '../../core/variaveis.php';
include '../../core/funcoes.php';
include '../../core/msgDiscord.php';
include '../../core/banco.php';

extract($_POST);

$query =[
    'tabela' => 'usuario',
    'igual' =>[
        'email' => $email,
        'senha' => hash('sha512', $senha)
    ],
    'contar' => true
];

if(select($query) == 1){
    $retorno= [
        'status' => true,
        'msg' => "Login efetuado com sucesso"
    ];
}else{
    $retorno= [
        'status' => false,
        'msg' => "Email ou senha invalidos"
    ];
}


echo json_encode($retorno, true);