# Base para criar um arquivo no app

```
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link rel="stylesheet" href="../../framework/materialize/css/materialize.css">
    <link rel="stylesheet" href="../../core/cores.css">
    <link rel="stylesheet" href="../../core/elements.css">
    <link rel="stylesheet" href="../../core/calsses.css">
    <link rel="stylesheet" href="../../css/toasts.css">
    <title>Home</title>
</head>

<body onload="telaCarregandoHide()">
    <!--Nav-->
    <div class="scale-transition scale-out conteudoPagina navbar-fixed" style="display: none;">
        <nav>
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo">{{_AppNameNav}}</a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    {{_Nav}}
                </ul>
            </div>
        </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
        {{_NavMobile}}
    </ul>

    <!--carregando-->
    <section class="scale-transition scale-in carregandoPagina">
        <img class="materialboxed" src="../../img/carregando.gif">
    </section>

    <!--pagina-->
    <section class="scale-transition scale-out conteudoPagina" style="display: none;">
        <!--conteudo-->
    </section>

    <script src="../../framework/jquery-3.6.0.min.js"></script>
    <script src="../../framework/materialize/js/materialize.js"></script>
    <script src="../../core/variaveis.js"></script>
    <script src="../../core/funcoes.js"></script>
    <script src="../../js/toasts.js"></script>
    <script>
        validaLogin();
    </script>
    <script src="../../core/textos.js"></script>
</body>

</html>
```

# Base para criar arquivo no servidor
```
```