<?php

header('Content-Type: application/json');

include '../../core/variaveis.php';
include '../../core/funcoes.php';
include '../../core/msgDiscord.php';
include '../../core/banco.php';

extract($_POST);

if(validaLogin()){
    $dados = [
        'sigla' => $sigla,
        'nome' => $nome,
        'ativo' => true
    ];
    
    $insert = insert($dados, 'inventario');
    
    if($insert['status']){
        $dados = [
            'usuario' => $_SESSION['usuario']['id'],
            'inventario' => $insert['id']
        ];
        $insert = insert($dados, 'usuario_inventario');
    
        if($insert['status']){
            $retorno = [
                'status' => true,
                'logado' => true,
                'msg' => "inventario cadastrado com sucesso"
            ];
        }else{
            $retorno = [
                'status' => false,
                'logado' => true,
                'msg' => "Não foi possivel relacionar o inventario a você"
            ];
            $mensagem[] = [
                "name" => "Dados:",
                "value" => $dados,
                "inline" => false
            ];
            mensagemDiscord($mensagem, "Erro de vinculo", "Houve um erro no relacionamento", "Não foi possivel vincular o usuario ao inventario", $_BootErro, 'ff0000');
        }
    }else{
        $retorno = [
            'status' => false,
            'logado' => true,
            'msg' => 'Houve um erro ao cadastrar o inventario'
        ];
    }
}else{
    $retorno = [
        'status' => false,
        'logado' => false,
        'msg' => 'você não está logado'
    ];
}

echo json_encode($retorno, true);