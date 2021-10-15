<?php

    /**
     * Efetua a conexão com o banco de dados
     *
     * @return pdo a conexão com o banco
     */
    function conexao(){

        global $_HostBanco;
        global $_NomeBanco;
        global $_UsuarioBanco;
        global $_SenhaBanco;
        global $_UrlWebhookBanco;
        global $_BootBanco;

        try{
            $pdo = new PDO("mysql:host=$_HostBanco;dbname=$_NomeBanco", $_UsuarioBanco, $_SenhaBanco); 
            return $pdo;
        }catch(Exception $e){
            var_dump($e->getMessage());
            $mensagem[] = [
                "name" => "Excessão:",
                "value" => $e->getMessage(),
                "inline" => false
            ];
            mensagemDiscord($_UrlWebhookBanco, $mensagem, "Erro ao conectar", "Não foi possivel conectar ao banco", "Erro de conexão com a base de dados", $_BootBanco);
            die();
        }

    }
    
?>