var textos = {
    'AppNameNav': _NomeApp
};

for (const [key, value] of Object.entries(textos)) {
    document.body.innerHTML = document.body.innerHTML.replace('{{_'+key+'}}', value);
}
