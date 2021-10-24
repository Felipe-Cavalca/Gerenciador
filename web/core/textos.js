var aspas = "'";
var nav = ' <li><a onclick="redireciona('+aspas+_UrlApp+"pg/cadastro.html"+aspas+');">Cadastro</a></li>' +
          ' <li><a href="badges.html">Components</a></li>' +
          ' <li><a href="collapsible.html">Javascript</a></li>' +
          ' <li><a href="mobile.html">Mobile</a></li>';

var textos = {
    'AppNameNav': _NomeApp,
    'Nav': nav,
    'NavMobile' : nav,
    'UrlHome' : _UrlApp+'pg/home/home.html',
};

for (const [key, value] of Object.entries(textos)) {
    document.body.innerHTML = document.body.innerHTML.replace('{{_'+key+'}}', value);
}
