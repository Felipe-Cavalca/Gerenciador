<?php

include 'core/variaveis.php';
include 'core/funcoes.php';
include 'core/msgDiscord.php';
include 'core/banco.php';

extract($_POST);

$query =[
    'tabela' => 'usuario',
    'igual' =>[
        'email' => $email
    ],
    'contar' => true
];

if(select($query) == 0){
    $dados=[
        'nome' => $nome,
        'email' => $email,
        'senha' => hash('sha512', $senha)
    ];
    if(insert($dados, 'usuario')){
        $retorno= [
            'status' => true,
            'msg' => "Cadastro efetuado com sucesso"
        ];
    }
}else{
    $retorno= [
        'status' => false,
        'msg' => "Esse email já está cadastrado"
    ];
}


echo json_encode($retorno, true);