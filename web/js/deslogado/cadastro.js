$(document).ready(function() {
    $("#cadastro").submit(function(event) {

        //para não fazer o submit do form
        event.preventDefault();

        //altera as classes dos botôes para fazer as animações
        $("#btnCadastro").removeClass("scale-in");
        $("#btnCadastro").addClass("scale-out");
        $("#carregando").removeClass("scale-out");
        $("#carregando").addClass("scale-in");

        //valida a difetença das senhas
        if($('#senha').val() === $('#confirmaSenha').val()){
            //envia os dados e agurda a resp
            $.ajax({
                url : _UrlServer+"deslogado/cadastro.php", //!_URL
                type : 'post',
                data : {
                    nome : $('#nome').val(),
                    email : $('#email').val(),
                    senha : $('#senha').val(),
                },
                beforeSend : function(){
                }
            })
            .done(function(msg){
                setTimeout(function () {
                    if(msg['status'] == true){
                        toastSucesso("Cadastro concluido");
                        $("#logar").addClass("pulse");
                        setTimeout(function (){
                            redireciona("login.html");
                        }, 5000);
                    }else{
                        toastErro(msg['msg']);    
                    }
                },1500);
            })
            .fail(function(){
                toastErro("Não foi possivel localizar o servidor!");
            });
        }else{
            toastErro("A senha não é igual a confirmação da senha");
        }
        
        setTimeout(function () {
            //altera as classes dos botoes para fazer animações
            //altera as classes dos botôes para fazer as animações
            $("#btnCadastro").removeClass("scale-out");
            $("#btnCadastro").addClass("scale-in");
            $("#carregando").removeClass("scale-in");
            $("#carregando").addClass("scale-out");
        }, 1000)
    });
});