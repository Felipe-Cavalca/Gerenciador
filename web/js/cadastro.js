$(document).ready(function() {
    $("#form-inventario").submit(function(event) {

        //para não fazer o submit do form
        event.preventDefault();

        //altera as classes dos botôes para fazer as animações
        $("#btn-cadastro-inventario").removeClass("scale-in");
        $("#btn-cadastro-inventario").addClass("scale-out");
        $("#carregando-inventario").removeClass("scale-out");
        $("#carregando-inventario").addClass("scale-in");

        
        //envia os dados e agurda a resp
        $.ajax({
            url : _UrlServer+'inventario/cadastro.php', 
            type : 'post',
            data : {
                sigla: $('#sigla').val(),
                nome: $('#nome').val(),
            },
            beforeSend : function(){
            }
        })
        .done(function(msg){
            setTimeout(function () {
                if(msg['status'] == true){
                    toastSucesso("Cadastro concluido");
                }else{
                    if(!msg['logado']){
                        deslogar();
                    }else{
                        toastErro(msg['msg']);
                    }
                }
            },1500);
        })
        .fail(function(){
            toastErro("Não foi possivel localizar o servidor!");
        });
        
        setTimeout(function () {
            //altera as classes dos botoes para fazer animações
            //altera as classes dos botôes para fazer as animações
            $("#btn-cadastro-inventario").removeClass("scale-out");
            $("#btn-cadastro-inventario").addClass("scale-in");
            $("#carregando-inventario").removeClass("scale-in");
            $("#carregando-inventario").addClass("scale-out");
        }, 1000)
    });
});