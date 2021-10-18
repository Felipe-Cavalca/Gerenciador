<?php

//urls
$_UrlApp = "http://gerenciador/v2/web/";
$_UrlServer = "http://gerenciador/v2/server/";
$_UrlWebhookDefault = "";

//nomes
$_AppNome = "gerenciador";

//Banco
$_HostBanco = 'localhost';
$_NomeBanco = 'gerenciador';
$_UsuarioBanco = 'root';
$_SenhaBanco = '';

//boots
$_ImgBootDefault = '';
$_BootDefault = [
    'url' => $_UrlWebhookDefault,
    'nome' => "Boot ".$_AppNome,
    'img' => $_ImgBootDefault
];
$_BootBanco = [
    'nome' => "Boot Banco ".$_AppNome,
    'img' => ''
];
?>