<?php

//urls
$_UrlApp = "http://gerenciador/v2/app/";
$_UrlServer = "http://gerenciador/v2/server/";
$_UrlWebhookBanco = "";

//nomes
$_AppNome = "gerenciador";

//Banco
$_HostBanco = 'localhost';
$_NomeBanco = 'gerenciador';
$_UsuarioBanco = 'root';
$_SenhaBanco = '';

//os bots precisam de imagem
//boots
$_ImgBootDefault = '';
$_BootDefault = [
    'nome' => "Boot ".$_AppNome,
    'img' => $_ImgBootDefault
];
$_BootBanco = [
    'nome' => "Boot Banco ".$_AppNome,
    'img' => ''
];
?>