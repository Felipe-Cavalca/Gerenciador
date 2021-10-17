
function toastSucesso(msg){
    M.toast({
        html: msg,
        classes: "toast toast-sucesso"
    });
}

function toastErro(msg){
    M.toast({
        html: msg,
        classes: "toast toast-erro"
    });
}

function toastAviso(msg){
    M.toast({
        html: msg,
        classes: "toast toast-aviso"
    });
}

function toastErroDesconhecido(){
    M.toast({
        html: 'Erro desconhecido! <br>Entre em contato com a equipe de suporte',
        classes: "toast toast-erro"
    });
}