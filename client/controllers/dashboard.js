angular.module("app").controller("dashboardCtrl", function($scope, $meteor, $state, $stateParams)
{
	$scope.actualizarGrafica = function(){
		var cotizaciones = Cotizaciones.find({empresa_id: $scope.currentUser.empresa_id}).fetch();
		var suma = 0;
		
		cotizaciones = _.groupBy(cotizaciones, function(cot){
			return cot.cliente_id;
		});
		
		var resultado = [];		
		var suma = 0;		
		var categorias = [];
		_.each(cotizaciones, function(cotizacion){
			var cliente = "";
			_.each(cotizacion, function(c){
				cliente = Clientes.findOne({_id:c.cliente_id});				
				suma += c.total;
			});			
			resultado.push({name:cliente.nombre, y:suma});
			suma = 0;
		});
		_.each(resultado, function(res){
			categorias.push(res.name);
		});
		
		//Imprimir Gráfica de Inscripciones
	  $(function () {
			// Create the chart
	  	$('#cotizaciones').highcharts({
				chart: {
				    type: 'column'
				},
				title: {
				    text: 'Cotizaciones'
				},
				subtitle: {
				    text: 'Gráfica de cotizacion por Cliente'
				},
				xAxis: {
				  	categories:categorias,
				    //type: 'Categoría'
				},
				yAxis: {
				    title: {
				        text: 'Pesos'
				    }	
				},
				legend: {
				    enabled: false
				},
				plotOptions: {
				    series: {
				        borderWidth: 0,
				        dataLabels: {
				            enabled: true,
				            format: '${point.y:,.2f}'
				        }
				    }
				},
				
				tooltip: {
				    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.2f}</b> pesos<br/>'
				},
				
				series: [{
						animation:{
		          duration: 0
		        },
				    name: "Cotizaciones por Cliente",
				    colorByPoint: true,
				    data: resultado
				}]
		  });
		  
		});
	}
	
	$meteor.autorun($scope, function() {
	  $scope.actualizarGrafica();
	});
});