<?php

header('Content-Type: application/json');

include '../../core/variaveis.php';
include '../../core/funcoes.php';
include '../../core/msgDiscord.php';
include '../../core/banco.php';

if(validaLogin()){
    $pesquisa = [
        'query' => "SELECT i.id, i.sigla, i.nome, i.ativo FROM usuario_inventario AS ui INNER JOIN inventario AS i ON ui.inventario = i.id WHERE ui.usuario = ".$_SESSION['usuario']['id'] . " Order by i.ativo desc"
    ];
    
    $pesquisa = select($pesquisa);
    
    $retorno = [
        'status' => true,
        'logado' => true,
        'msg' => 'listagem de inventarios',
        'qtd' => count($pesquisa)
    ];

    foreach($pesquisa as $invnetario){
        $retorno['inventarios'][] = [
            'id' => $invnetario['id'],
            'sigla' => $invnetario['sigla'],
            'nome' => $invnetario['nome'],
            'ativo' => $invnetario['ativo']
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