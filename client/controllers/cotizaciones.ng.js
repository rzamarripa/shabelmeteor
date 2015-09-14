angular.module("app").controller("cotizacionesCtrl", function($scope, $meteor, $state, $stateParams)
{
$scope.articulos = $meteor.collection(Articulos);
$scope.clientes = $meteor.collection(Clientes);
$scope.cotizacion = Requisiciones.findOne({_id:$stateParams._id},{fields:{_id:0}});
$scope.items = $scope.cotizacion.detalle;
$scope.cotizacion.porcentajeGeneral = 0;
angular.forEach($scope.items, function (item) {
		item.porcentaje = 0;
		item.precioUnitario = 0;
	});
$scope.action = true;
$scope.porcentajeGeneral=0;
var empty_item = {
    cantidad: 0,
    precio:0,
	importe:0,
	precioUnitario:0,
	porcentaje:0,
};

$scope.save = function(cotizacion)
{
    cotizacion.detalle = angular.copy($scope.items);
    console.log(cotizacion);
    Cotizaciones.insert(cotizacion);
    $state.go("requisiciones");
};

$scope.addItem = function() {
    $scope.items.push(angular.copy(empty_item));
};

$scope.cancelar = function (item, e) {
    e.preventDefault();
    var c = confirm('¿Está seguro de remover este artículo?');
    if (!c) return;
    var i = $scope.items.indexOf(item);
    if (i >= 0) $scope.items.splice(i, 1);
};
$scope.selected = function(variable1, variable2){
    if(variable1 == variable2)return 'selected';
};

$scope.getTotal = function(){
	$scope.cotizacion.subtotal = 0;
	angular.forEach($scope.items, function (item) {
		var precioFinal = 0;
			if($scope.cotizacion.porcentajeGeneral === null && item.porcentaje === null){precioFinal = item.precioUnitario;}
			else if($scope.cotizacion.porcentajeGeneral === null){precioFinal = ((item.precioUnitario * item.porcentaje)/100) + item.precioUnitario;}
			else if($scope.cotizacion.porcentajeGeneral >= 0){precioFinal = ((item.precioUnitario * (item.porcentaje+parseFloat($scope.cotizacion.porcentajeGeneral)))/100) + item.precioUnitario;}
			item.precioFinal = precioFinal;
			var importe = 0;
			importe = item.precioFinal * item.cantidad;
			item.importe = importe;
			$scope.cotizacion.subtotal += item.importe;
	});
	$scope.cotizacion.iva = $scope.cotizacion.subtotal*.16;
	$scope.cotizacion.total = $scope.cotizacion.subtotal + $scope.cotizacion.iva;
};
});