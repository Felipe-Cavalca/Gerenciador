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
        $edicao = query("DELETE FROM inventario WHERE id = ".$id);
        $edicao = query("DELETE FROM usuario_inventario WHERE inventario = ".$id);

        $retorno = [
            'status' => true,
            'logado' => true,
            'msg' => 'Inventario Excluido',
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