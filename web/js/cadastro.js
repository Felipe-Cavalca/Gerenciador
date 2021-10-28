$(document).ready(function () {
    $("#form-inventario").submit(function (event) {

        //para não fazer o submit do form
        event.preventDefault();

        //altera as classes dos botôes para fazer as animações
        $("#btn-cadastro-inventario").removeClass("scale-in");
        $("#btn-cadastro-inventario").addClass("scale-out");
        $("#carregando-inventario").removeClass("scale-out");
        $("#carregando-inventario").addClass("scale-in");


        //envia os dados e agurda a resp
        $.ajax({
            url: _UrlServer + 'inventario/cadastro.php',
            type: 'post',
            data: {
                sigla: $('#sigla-inventario').val(),
                nome: $('#nome-inventario').val(),
            },
            beforeSend: function () {
            }
        })
            .done(function (msg) {
                //seta um tempo apos a resposta
                setTimeout(function () {
                    //caso sucesso
                    if (msg['status'] == true) {
                        //exibe o toast e chama a função de listar inventario
                        toastSucesso("Cadastro concluido");
                        listarInventarios('tabelaIventarios', 'carregandoTabelaInventarios', 'selecionaInventario()');
                    } else {
                        //caso erro verifica se está logado
                        if (!msg['logado']) {
                            deslogar();
                        } else {
                            toastErro(msg['msg']);
                        }
                    }
                    //aguarda um tempo para não ficar esquisito
                    setTimeout(function () {
                        //altera as classes dos botoes para fazer animações
                        //altera as classes dos botôes para fazer as animações
                        $("#btn-cadastro-inventario").removeClass("scale-out");
                        $("#btn-cadastro-inventario").addClass("scale-in");
                        $("#carregando-inventario").removeClass("scale-in");
                        $("#carregando-inventario").addClass("scale-out");
                    }, 1000)
                }, 1500);
            })
            .fail(function () {
                //caso a reuisição falhe
                toastErro("Não foi possivel localizar o servidor!");
            });
    });

});


//seleção de inventario
function selecionaInventario() {
    //quando o botão receber um click
    $(".acaoInventario").on("click", function () {

        if ($(window).width() < _TamanhoMobile) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        edicaoInventarioHide();

        //seta os valores
        $('input#id-inventario').val($(this).data('id'));
        $('input#sigla-inventario').val($(this).data('sigla'));
        $('input#nome-inventario').val($(this).data('nome'));
        $('#sigla-nome-inventario').html("<b>" + $(this).data('sigla') + "." + $(this).data('nome') + "</b>");

        //remove o botão de cadastro
        $("#btn-cadastro-inventario").removeClass("scale-in");
        $("#btn-cadastro-inventario").addClass("scale-out");

        //executa depois de um tempo pra não ficar esquisita a transição
        setTimeout(function () {
            //some com o botão de cadastro
            $("#btn-cadastro-inventario").hide();
            //exibe os botões
            $("#btn-editar-inventario").show();
            $("#btn-excluir-inventario").show();
            $("#btn-cancelar-inventario").show();
            $("#btn-editar-inventario").removeClass("scale-out");
            $("#btn-editar-inventario").addClass("scale-in");
            $("#btn-excluir-inventario").removeClass("scale-out");
            $("#btn-excluir-inventario").addClass("scale-in");
            $("#btn-cancelar-inventario").removeClass("scale-out");
            $("#btn-cancelar-inventario").addClass("scale-in");
            $("#indicacao-edicao-inventario").removeClass("scale-out");
            $("#indicacao-edicao-inventario").addClass("scale-in");
        }, 300);
    });
}

//animação de sumir com a tela de edição
function edicaoInventarioHide() {
    $("#carregando-inventario").removeClass("scale-in");
    $("#carregando-inventario").addClass("scale-out");

    $("#btn-editar-inventario").removeClass("scale-in");
    $("#btn-editar-inventario").addClass("scale-out");
    $("#btn-excluir-inventario").removeClass("scale-in");
    $("#btn-excluir-inventario").addClass("scale-out");
    $("#btn-cancelar-inventario").removeClass("scale-in");
    $("#btn-cancelar-inventario").addClass("scale-out");
    $("#indicacao-edicao-inventario").removeClass("scale-in");
    $("#indicacao-edicao-inventario").addClass("scale-out");

    setTimeout(function () {
        //esconde os botões
        $("#btn-editar-inventario").hide();
        $("#btn-excluir-inventario").hide();
        $("#btn-cancelar-inventario").hide();
        //mostra o botão de cadastro
        $("#btn-cadastro-inventario").show();
        //remove o botão de cadastro
        $("#btn-cadastro-inventario").removeClass("scale-out");
        $("#btn-cadastro-inventario").addClass("scale-in");
    }, 300);

    //seta os valores
    $('input#id-inventario').val(0);
    $('input#sigla-inventario').val('');
    $('input#nome-inventario').val('');
    $('#sigla-nome-inventario').html("");
}


function modificarInventario(tipo) {
    //altera as classes dos botôes para fazer as animações
    $("#btn-editar-inventario").removeClass("scale-in");
    $("#btn-editar-inventario").addClass("scale-out");
    $("#btn-excluir-inventario").removeClass("scale-in");
    $("#btn-excluir-inventario").addClass("scale-out");
    $("#btn-cancelar-inventario").removeClass("scale-in");
    $("#btn-cancelar-inventario").addClass("scale-out");
    $("#carregando-inventario").removeClass("scale-out");
    $("#carregando-inventario").addClass("scale-in");

    if (tipo == 'editar') {
        //envia os dados e agurda a resp
        $.ajax({
            url: _UrlServer + 'inventario/editar.php',
            type: 'post',
            data: {
                id: $('#id-inventario').val(),
                sigla: $('#sigla-inventario').val(),
                nome: $('#nome-inventario').val(),
            }
        })
            .done(function (msg) {
                //seta um tempo apos a resposta
                setTimeout(function () {
                    //caso sucesso
                    if (msg['status'] == true) {
                        //exibe o toast e chama a função de listar inventario
                        toastSucesso("Inventario editado");
                        listarInventarios('tabelaIventarios', 'carregandoTabelaInventarios', 'selecionaInventario()');
                    } else {
                        //caso erro verifica se está logado
                        if (!msg['logado']) {
                            deslogar();
                        } else {
                            toastErro(msg['msg']);
                        }
                    }
                    //aguarda um tempo para não ficar esquisito
                    setTimeout(function () {
                        edicaoInventarioHide();
                    }, 1000)
                }, 1500);
            })
            .fail(function () {
                //caso a reuisição falhe
                toastErro("Não foi possivel localizar o servidor!");
                //aguarda um tempo para não ficar esquisito
                setTimeout(function () {
                    edicaoInventarioHide();
                }, 5000)
            });
    } else if (tipo == "desativar" || tipo == 'excluir') {
        //envia os dados e agurda a resp
        $.ajax({
            url: _UrlServer + 'inventario/'+tipo+'.php',
            type: 'post',
            data: {
                id: $('#id-inventario').val()
            }
        })
            .done(function (msg) {
                //seta um tempo apos a resposta
                setTimeout(function () {
                    //caso sucesso
                    if (msg['status'] == true) {
                        //exibe o toast e chama a função de listar inventario
                        toastSucesso("Inventario "+tipo);
                        listarInventarios('tabelaIventarios', 'carregandoTabelaInventarios', 'selecionaInventario()');
                    } else {
                        //caso erro verifica se está logado
                        if (!msg['logado']) {
                            deslogar();
                        } else {
                            toastErro(msg['msg']);
                        }
                    }
                    //aguarda um tempo para não ficar esquisito
                    setTimeout(function () {
                        edicaoInventarioHide();
                    }, 1000)
                }, 1500);
            })
            .fail(function () {
                //caso a reuisição falhe
                toastErro("Não foi possivel localizar o servidor!");
                //aguarda um tempo para não ficar esquisito
                setTimeout(function () {
                    edicaoInventarioHide();
                }, 5000)
            });
    }
}