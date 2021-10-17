function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

function validaLogin(){
    //envia os dados e agurda a resp
    $.ajax({
        url : _UrlServer+"validarLogin.php", //!_URL
        type : 'post',
        data : {
        },
        beforeSend : function(){
        }
    })
    .done(function(msg){
        if(isJson(msg)){
            dados = JSON.parse(msg);
            if(dados['status'] == false){
                toastErro(dados['msg']);
                setTimeout(function () {
                    window.location.href = _UrlApp; //!_URL
                }, 1000);
            }    
        }else{
            toastErroDesconhecido();
        }
    })
    .fail(function(){
        toastErro("Não foi possivel localizar o servidor!");
    });
}