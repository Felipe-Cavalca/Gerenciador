$(document).ready(function() {
    $("#login").submit(function(event) {

        //para não fazer o submit do form
        event.preventDefault();

        //altera as classes dos botôes para fazer as animações
        $("#btnLogin").removeClass("scale-in");
        $("#btnLogin").addClass("scale-out");
        $("#carregando").removeClass("scale-out");
        $("#carregando").addClass("scale-in");

        //envia os dados e agurda a resp
        $.ajax({
            url : _UrlServer+"deslogado/login.php", //!_URL
            type : 'post',
            data : {
                email : $('#email').val(),
                senha : $('#senha').val(),
            },
            beforeSend : function(){
            }
        })
        .done(function(msg){
            setTimeout(function () {
                if(isJson(msg)){
                    dados = JSON.parse(msg);
                    if(dados['status'] == true){
                        toastSucesso("Login concluido");
                        setTimeout(function (){
                            redireciona("../home/home.html");
                        }, 2000);
                    }else{
                        toastErro(dados['msg']);
                    }    
                }else{
                    toastErroDesconhecido();
                }
            },1500);
        })
        .fail(function(){
            toastErro("Não foi possivel localizar o servidor!");
        });
        
        setTimeout(function () {
            //altera as classes dos botoes para fazer animações
            //altera as classes dos botôes para fazer as animações
            $("#btnLogin").removeClass("scale-out");
            $("#btnLogin").addClass("scale-in");
            $("#carregando").removeClass("scale-in");
            $("#carregando").addClass("scale-out");
        }, 1000)
    });
});