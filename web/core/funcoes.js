//inicialização de componentes de todas as paginas
$(document).ready(function(){
    $('.sidenav').sidenav();

    // window.addEventListener("beforeunload", function (event) {
    //     telaCarregandoShow();
    // });
});

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
        if(msg['status'] == false){
            toastErro(msg['msg']);
            setTimeout(function () {
                redireciona(_UrlApp); //!_URL
            }, 1000);
        }
    })
    .fail(function(){
        toastErro("Não foi possivel localizar o servidor!");
    });
}

function deslogar(){
    // Data no passado
    var data = new Date(2010,0,01);
    // Converte a data para GMT
    data = data.toGMTString();
    // Apaga o cookie
    document.cookie = 'PHPSESSID=; expires=' + data + '; path=/';

    toastAviso('Saindo');
    setTimeout(function () {
        redireciona(_UrlApp); //!_URL
    }, 1000);
}

function telaCarregandoHide(){
    setTimeout(function () {
        setTimeout(function () {
            $(".carregandoPagina").removeClass("scale-in");
            $(".carregandoPagina").addClass("scale-out");
            setTimeout(function () {
                $(".carregandoPagina").hide();
                $(".conteudoPagina").show();
                $(".conteudoPagina").removeClass("scale-out");
                $(".conteudoPagina").addClass("scale-in");
            },300);
        },300);
    }, 2000);
}
function telaCarregandoShow(){
    $(".conteudoPagina").removeClass("scale-in");
    $(".conteudoPagina").addClass("scale-out");
    setTimeout(function () {
        $(".conteudoPagina").hide();
        $(".carregandoPagina").show();
        $(".carregandoPagina").removeClass("scale-out");
        $(".carregandoPagina").addClass("scale-in");
    },300);
}

function redireciona(url){
    telaCarregandoShow();
    setTimeout(function (){
        window.location.href = url;
    }, 1500);
}

function hideElement(elem){
    
}