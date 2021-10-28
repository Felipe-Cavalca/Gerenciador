function listarInventarios(element, elementCarregamneto, funcao){
    valAutocompleteInventarios = {};

    $("#"+element).removeClass("scale-in");
    $("#"+element).addClass("scale-out");
    setTimeout(function () {
        $("#"+elementCarregamneto).show();
        $("#"+elementCarregamneto).removeClass("scale-out");
        $("#"+elementCarregamneto).addClass("scale-in");
        if ($(window).width() < _TamanhoMobile) {
            window.scrollTo(0,0);
        }
    },400);

    //envia os dados e agurda a resp
    $.ajax({
        url : _UrlServer+'inventario/listar.php',
        type : 'get',
        data : {}
    })
    .done(function(msg){

        if(msg['status']){
            $('#'+element).html('');
            if(msg['qtd'] > 0){
                setTimeout(function () {
            
                    var texto = '<table class="striped centered" id="tabela-inventarios">'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>Inventario</th>'+
                                    '<th>Editar</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';
            
                    var i=0;
                    msg['inventarios'].forEach(element => {
                        // inventarios[i] = {
                        //     "id" : element.id,
                        //     "sigla" : element.sigla,
                        //     "nome" : element.nome
                        // };
                        // i++;

                        var cor = (element.ativo == 1) ? '' : "style='color:red;'";

                        texto+= '<tr>'+
                                    '<td id="nome-inventario" '+cor+'>'+element.nome+'</td>'+
                                    '<td>'+
                                        '<i class="material-icons prefix acaoInventario"' +
                                        'data-id="'+element.id+'"'+
                                        'data-sigla="'+element.sigla+'"'+
                                        'data-nome="'+element.nome+'"'+
                                        '>edit</i>'+
                                    '</td>'+
                                '</tr>';
                    });
            
                    texto += '</tbody></table>';
            
                    $('#'+element).html(texto);
                    $(function(){
                        $("#pesquisa-invnetario").keyup(function(){
                            var index = $("#nome-inventario").index();
                            var nth = "#tabela-inventarios td:nth-child("+(index+1).toString()+")";
                            var valor = $(this).val().toUpperCase();
                            $("#tabela-inventarios tbody tr").show();
                            $(nth).each(function(){
                                if($(this).text().toUpperCase().indexOf(valor) < 0){
                                    $(this).parent().hide();
                                }
                            });
                        });
                     
                        $("#autocomplete-invnetario input").blur(function(){
                            $(this).val("");
                        });
                    });

                },300);
                setTimeout(function () {
                    eval(funcao);
                },300);
            }else{
                setTimeout(function () {
                    toastAviso("Não ha nenhum inventario cadastrado");
                },2500);
            }
        }else{
            toastErro("Houve um erro ao listar os seus inventarios");
        }
        setTimeout(function () {
            $("#"+elementCarregamneto).removeClass("scale-in");
            $("#"+elementCarregamneto).addClass("scale-out");
            setTimeout(function () {
                $("#"+elementCarregamneto).hide();
                $("#"+element).removeClass("scale-out");
                $("#"+element).addClass("scale-in");
            },300);
        },1000);
    })
    .fail(function(){
        toastErro("Não foi possivel localizar o servidor!");
    });
}