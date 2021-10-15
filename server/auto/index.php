<?php

//arquivo para a execucao do autoRun

//inclui os arquivos
include '../core/variaveis.php';
include '../core/msgDiscord.php';
include '../core/banco.php';

//faz fonexão com o banco
$banco = conexao();

//abre a pasta
$pasta = "structure/";
$diretorio = dir($pasta);

try{
    //le os arquivos da pasta
    while($arquivo = $diretorio -> read()){
    
        //verifica se o arquivo não é '.' ou '..'
        if($arquivo != '.' && $arquivo != '..'){
    
            //abre o arquivo sql e executa
            $sql = file_get_contents($pasta.$arquivo);
            
            $banco->exec($sql);
        }
    }

    //envia mensagem de sucesso para o discord
    mensagemDiscord($_UrlWebhookBanco, [], "Instalação", "AutoRun executado com sucesso", "O  auto run foi executado sem nenhum erro aparente", $_BootBanco, '39ff14');
    
}catch(Exception $e){
    //envia mensagem de erro caso algo não execute
    var_dump($e->getMessage());
    $mensagem[] = [
        "name" => "Execessão",
        "value" => $e->getMessage(),
        "inline" => false
    ];
    mensagemDiscord($_UrlWebhookBanco, $mensagem, "Erro no autoRun", "Não foi possivel executar um arquivo sql", "O arquivo foi listado mas por algum erro não foi possivel rodar", $_BootBanco);
}

//fecha o arquivo que foi aberto
$diretorio -> close();
?>