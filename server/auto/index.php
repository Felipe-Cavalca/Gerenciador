<?php

//arquivo para a execucao do autoRun

//inclui os arquivos
include '../core/variaveis.php';
include '../core/msgDiscord.php';
include '../core/banco.php';

try{
    //abre a pasta
    $pasta = "structure/";
    $diretorio = dir($pasta);
    
    //faz fonexão com o banco
    $banco = conexao();

    //valida se foi feita a conexao()
    if(!$banco){
        throw new Exception('Não conectou ao banco');
    }

    //le os arquivos da pasta
    while($arquivo = $diretorio -> read()){
    
        //verifica se o arquivo não é '.' ou '..'
        if($arquivo != '.' && $arquivo != '..'){
    
            //abre o arquivo sql e executa
            $sql = file_get_contents($pasta.$arquivo);
            
            $banco->exec($sql);
        }
    }

    $diretorio -> close();
    //faz a mesma coisa com as alterações
    
    //abre a pasta
    $pasta = "alteracoes/";
    $diretorio = dir($pasta);

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
    mensagemDiscord([], "Instalação", "AutoRun executado com sucesso", "O  auto run foi executado sem nenhum erro aparente", $_BootBanco, '39ff14');
    
}catch(Exception $e){
    //envia mensagem de erro caso algo não execute
    $mensagem[] = [
        "name" => "Execessão",
        "value" => $e->getMessage(),
        "inline" => false
    ];
    mensagemDiscord($mensagem, "Erro no autoRun", "Não foi possivel executar um arquivo sql", "O arquivo foi listado mas por algum erro não foi possivel rodar", $_BootBanco, 'ff0000');
}

//fecha o arquivo que foi aberto
$diretorio -> close();
?>