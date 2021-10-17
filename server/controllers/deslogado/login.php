<?php

include '../../core/variaveis.php';
include '../../core/funcoes.php';
include '../../core/msgDiscord.php';
include '../../core/banco.php';

extract($_POST);

$query =[
    'tabela' => 'usuario',
    'campos' => ['id','email'],
    'igual' =>[
        'email' => $email,
        'senha' => hash('sha512', $senha)
    ]
];

$usuario = select($query);

if(count($usuario) == 1){
    session_start();
    $_SESSION['usuario']['id'] = $usuario[0]['id'];
    $_SESSION['usuario']['email'] = $usuario[0]['email'];
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