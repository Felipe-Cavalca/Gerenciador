<?php

header('Content-Type: application/json');

include '../../core/variaveis.php';
include '../../core/funcoes.php';
include '../../core/msgDiscord.php';
include '../../core/banco.php';

extract($_POST);

if(validaLogin()){

    $pesquisa = [
        'tabela' => 'usuario_inventario',
        'igual' => [
            'usuario' => $_SESSION['usuario']['id'],
            'inventario' => $id
        ],
        'contar' => true
    ];

    if(select($pesquisa) == 1){

        $edicao = query("UPDATE inventario SET nome = '".$nome."', sigla = '".$sigla."', ativo = true, modified = '".date('Y-m-d H:m:s')."' WHERE id = ".$id);

        $retorno = [
            'status' => true,
            'logado' => true,
            'msg' => 'Inventario atualizado',
        ];
    }else{
        $retorno = [
            'status' => false,
            'logado' => true,
            'msg' => 'O inventario selecionado não é valido'
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