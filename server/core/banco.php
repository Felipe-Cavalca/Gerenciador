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
        global $_BootBanco;

        try{
            $pdo = new PDO("mysql:host=$_HostBanco;dbname=$_NomeBanco", $_UsuarioBanco, $_SenhaBanco);
            return $pdo;
        }catch(Exception $e){
            $mensagem[] = [
                "name" => "Excessão:",
                "value" => $e->getMessage(),
                "inline" => false
            ];
            mensagemDiscord($mensagem, $_BootBanco, 'ff0000');
            return false;
        }
    }

    /**
     * Função para inserir no banco
     * não é necessario fazer a conexão, a função já faz
     *
     * @param [type] $dados array associativo ['campo' => 'valor', 'campo2' => 'valor2', ...]
     * @param [type] $tabela nome da tabela
     * @return array
     */
    function insert($dados = [], $tabela = ''){
        //captura as variaveis globais
        global $_BootBanco;

        try{
            //verifica se os dados ou a tabela estão vazios
            if(empty($dados)){
                throw new Exception('Não ha dados para inserir');
            }
            if(empty($tabela)){
                throw new Exception('Nenhuma tabela definida para ser inserirido os dados');
            }

            //cria os campos de criado e modificado
            $dados['created'] = date('Y-m-d H:m:s');
            $dados['modified'] = date('Y-m-d H:m:s');

            //transfomra o array associativo em script sql
            $campos = implode(', ', array_Keys($dados));
            $valores = ':' . implode(', :', array_keys($dados));
            $Create = "INSERT INTO {$tabela} ({$campos}) VALUES ({$valores})";

            //faz a conexao
            $pdo = conexao();

            //verifica se a conexão foi feita
            if(!$pdo){
                throw new Exception('A conexão não foi estabelecida');
            }

            //prepara o script
            $sth = $pdo->prepare($Create);

            //faz o insert   
            if($sth->execute($dados)){
                return ['status' => true, 'id' => $pdo->lastInsertId()];
            }else{
                throw new Exception('O dado não foi inserido');
            }
        }catch(Exception $e){
            $mensagem[] = [
                "name" => "Execessão",
                "value" => $e->getMessage(),
                "inline" => false
            ];
            mensagemDiscord($mensagem, $_BootBanco, 'ff0000');
            return ['status' => false];
        }
        
    }

    /**
     * Função para pesquisar no banco de dados
     * indices do array:
     * tabela - qual tabela será pesquisada
     * campos - os campos que são pesquisados
     * igual - pesquisa os iguais ['indice' => 'valor', .....]
     * contar - true para contar a quantidade de registros na tabela
     * query - a consulta em sql
     *
     * @param array $arr
     * @return array
     */
    function select($arr= []){
        
        if(!isset($arr['query'])){
            $query = 'SELECT ';
    
            if(isset($arr['campos'])){
                foreach($arr['campos'] as $campo){
                    $query.= '`'.$campo.'`, ';
                }
                $query = rtrim($query, ', ');
                $query.= ' ';
            }else{
                $query.= "* ";
            }
    
            if(isset($arr['tabela'])){
                $query.= "FROM `".$arr['tabela'].'` ';
            }else{
                return false;
            }
    
            if(isset($arr['igual'])){
                $query.= "WHERE ";
    
                foreach($arr['igual'] as $campo => $valor){
                    $query.= '`'.$campo.'` = "'.$valor. '" AND ';
                }
    
                $query = rtrim($query, ' AND');
            }
    
            $query = rtrim($query, ' ');
    
            $query .= ';';
        }else{
            $query = $arr['query'];
        }

        
        $conn = conexao();
        $execucao = $conn->prepare($query);
        $execucao->execute();
        
        if(isset($arr['contar'])){
            $retorno = $execucao->rowCount();
        }else{
            $retorno = [];
            foreach ($execucao as $res) {
                $retorno[] = $res; 
            }
        }

        return $retorno;
    }
    
    function update($arr = [], $tabela = ''){
        if(!isset($arr['query'])){

        }else{
            $query = $arr['query'];
        }

        $conn = conexao();
        $execucao = $conn->prepare($query);
        $execucao->execute();
        
        if(isset($arr['contar'])){
            $retorno = $execucao->rowCount();
        }else{
            $retorno = [];
            foreach ($execucao as $res) {
                $retorno[] = $res; 
            }
        }

        return $retorno;
    }

    function query($query) {
        $conn = conexao();
        $execucao = $conn->prepare($query);
        $execucao->execute();
        
        $retorno = [];
        foreach ($execucao as $res) {
            $retorno[] = $res; 
        }
        
        return $retorno;
    }
?>