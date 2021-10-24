//variaveis que devem ser listadas do banco
var listaInventarios = [
  "inventario 001",
  "inventario 002",
  "inventario 003",
  "inventario 004",
  "inventario 005",
  "inventario 006",
  "inventario 007",
  "inventario 008",
  "inventario 009",
  "inventario 010",
  "inventario 011",
  "inventario 012",
];

var valGraficoVendas = [
  ['Inventario', 'Valor'],
  ["inventario 1", 1],
  ["inventario 2", 5],
  ["inventario 3", 2],
  ["inventario 4", 7],
  ["inventario 5", 3],
];

var valGraficoAdicionados = [
  ['Inventario', 'Valor'],
  ["inventario 1", 1],
  ["inventario 2", 5],
  ["inventario 3", 2],
  ["inventario 4", 7],
  ["inventario 5", 3],
];

var valGraficoRemovidos = [
  ['Inventario', 'Valor'],
  ["inventario 1", 1],
  ["inventario 2", 5],
  ["inventario 3", 2],
  ["inventario 4", 7],
  ["inventario 5", 3],
];

//variaveis da pagina
var valAutocompleteInventarios = {};

//monta objeto para o autocomplete
function autocompleteInventarios() {
  listaInventarios.forEach(element => {
    valAutocompleteInventarios[element] = null;
  });
}

//quando a tela é redimensionada
$(window).resize(function () {
  grafico();
});

function grafico() {
  setTimeout(function () {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(graficoVendas);
    google.charts.setOnLoadCallback(graficoAdicionados);
    google.charts.setOnLoadCallback(graficoRemovidos);

    function graficoVendas() {
      var data = new google.visualization.arrayToDataTable(valGraficoVendas);

      var options = {
        width: $('.grafico-vendas').width(),
        height: 500,
        legend: { position: 'none' },
        chart: {
          title: '',
          subtitle: 'Esses foram os itens vendidos'
        },
        axes: {
          x: {
            0: { side: 'top', label: '' } // Top x-axis.
          }
        },
        bar: { groupWidth: "90%" }
      };

      var chart = new google.charts.Bar(document.getElementById('grafico-vendas'));
      // Convert the Classic options to Material options.
      chart.draw(data, google.charts.Bar.convertOptions(options));
    };

    function graficoAdicionados() {
      var data = new google.visualization.arrayToDataTable(valGraficoAdicionados);

      var options = {
        width: $('.grafico-adicionados').width(),
        height: 500,
        legend: { position: 'none' },
        chart: {
          title: '',
          subtitle: 'Esses foram os itens adicionados'
        },
        axes: {
          x: {
            0: { side: 'top', label: '' } // Top x-axis.
          }
        },
        bar: { groupWidth: "90%" }
      };

      var chart = new google.charts.Bar(document.getElementById('grafico-adicionados'));
      // Convert the Classic options to Material options.
      chart.draw(data, google.charts.Bar.convertOptions(options));
    };

    function graficoRemovidos() {
      var data = new google.visualization.arrayToDataTable(valGraficoRemovidos);

      var options = {
        width: $('.grafico-removidos').width(),
        height: 500,
        legend: { position: 'none' },
        chart: {
          title: '',
          subtitle: 'Esses foram os itens removidos'
        },
        axes: {
          x: {
            0: { side: 'top', label: '' } // Top x-axis.
          }
        },
        bar: { groupWidth: "90%" }
      };

      var chart = new google.charts.Bar(document.getElementById('grafico-removidos'));
      // Convert the Classic options to Material options.
      chart.draw(data, google.charts.Bar.convertOptions(options));
    };

  }, 50);
}

