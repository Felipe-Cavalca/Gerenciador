<?php

/**
 * Envia mensagem para o discord
 *
 * @param array $mensagem o array da mensagem
 * @param array $boot array com os dados do boot
 * @param string $cor a cor da mensagem
 * @return void
 */
function mensagemDiscord($mensagem, $boot=[], $cor="ffff00"){
    global $_BootDefault;

    if(!isset($boot['url'])){
        $boot['url'] = $_BootDefault['url'];
    }
    if(!isset($boot['nome'])){
        $boot['nome'] = $_BootDefault['nome'];
    }
    if(!isset($boot['img'])){
        $boot['img'] = $_BootDefault['img'];
    }

    //adciona o http user agent
    $mensagem[] = [
        "name" => "HTTP USER AGENT",
        "value" => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT'),
        "inline" => false
    ];

    //adcionar o request method
    $mensagem[] = [
        "name" => "REQUEST METHOD",
        "value" => filter_input(INPUT_SERVER, 'REQUEST_METHOD'),
        "inline" => false
    ];

    $json_data = json_encode([
        // Message
        // "content" => $mensagemTopo,
        
        // Username
        "username" => $boot['nome'],

        "avatar_url"=> $boot['img'],

        // Embeds Array
        "embeds" => [
            [
                // Embed Title
                // "title" => $titulo,

                // Embed Type
                "type" => "rich",

                // Embed Description
                // "description" => $descricao,

                // Timestamp of embed must be formatted as ISO8601
                "timestamp" => date("c", strtotime("now")),

                // Embed left border color in HEX
                "color" => hexdec($cor),

                // Additional Fields array
                "fields" => $mensagem
            ]
        ]

    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $ch = curl_init($boot['url']);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
    curl_setopt( $ch, CURLOPT_POST, 1);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch, CURLOPT_HEADER, 0);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec( $ch );
    // If you need to debug, or find out why you can't send message uncomment line below, and execute script.
    //echo $response;
    curl_close( $ch ); 
}