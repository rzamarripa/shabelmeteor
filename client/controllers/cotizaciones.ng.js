angular.module("app").controller("cotizacionesCtrl", function($scope, $meteor, $state, $stateParams)
{
$scope.articulos = $meteor.collection(Articulos);
$scope.clientes = $meteor.collection(Clientes);
$scope.proveedores = $meteor.collection(Proveedores);
Session.set('cotizacion',Requisiciones.findOne({_id:$stateParams._id},{fields:{_id:0}}));
$scope.cotizacion = Session.get('cotizacion');
$scope.items = $scope.cotizacion.detalle;
$scope.cotizacion.porcentajeGeneral = 0;
angular.forEach($scope.items, function (item) {
		item.porcentaje = 0;
		item.precioUnitario = 0;
		item.precioFinal = 0;
		item.importe = 0;
	});
$scope.action = true;
$scope.porcentajeGeneral=0;
var empty_item = {
    cantidad: 0,
    precioFinal:0,
	importe:0,
	precioUnitario:0,
	porcentaje:0,
};

$scope.save = function(cotizacion)
{
    cotizacion.detalle = angular.copy($scope.items);
    console.log(cotizacion);
    Cotizaciones.insert(cotizacion);
    $state.go("cotizaciones");
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
			if(!isNaN(item.importe)){$scope.cotizacion.subtotal += item.importe};
	});
	$scope.cotizacion.iva = $scope.cotizacion.subtotal*.16;
	$scope.cotizacion.total = $scope.cotizacion.subtotal + $scope.cotizacion.iva;
};
});



angular.module("app").controller("cotizacionesIndexCtrl", function($scope, $meteor, $state, $stateParams)
{
	$scope.cotizaciones = $meteor.collection(function(){return Cotizaciones.find({estatus:true})});

	$scope.removeAll = function(){
		$scope.cotizaciones.remove();
	}
	$scope.remove = function(cotizacion){
		cotizacion.estatus = false;
		$scope.cotizaciones.save(cotizacion);
	}
	$scope.nombreCliente = function(cotizacion){
          var cliente = Clientes.findOne({_id:cotizacion.cliente_id});
           return cliente.nombre;

        };
});

angular.module("app").controller("cotizacionesVerCtrl", function($scope, $meteor, $state, $stateParams)
{
	$scope.cotizacion = $meteor.object(Cotizaciones, $stateParams._id,false);

	$scope.nombreCliente = function(cliente_id){
          var cliente = Clientes.findOne({_id:cliente_id});
           return cliente.nombre;
        };
    $scope.nombreArticulo = function(articulo_id){
      var articulo = Articulos.findOne({_id:articulo_id});
       return articulo.nombre;
    };
    $scope.nombreProveedor = function(proveedor_id){
      var proveedor = Proveedores.findOne({_id:proveedor_id});
       return proveedor.nombre;
    };
});

angular.module("app").controller("cotizacionesUpdateCtrl", function($scope, $meteor, $state, $stateParams)
{
$scope.articulos = $meteor.collection(Articulos);
$scope.clientes = $meteor.collection(Clientes);
$scope.proveedores = $meteor.collection(Proveedores);
$scope.cotizacion = Cotizaciones.findOne({_id:$stateParams._id});
console.log($scope.cotizacion);
$scope.items = $scope.cotizacion.detalle;
$scope.action = true;

var empty_item = {
    cantidad: 0,
    precioFinal:0,
	importe:0,
	precioUnitario:0,
	porcentaje:0,
};

$scope.save = function(cotizacion)
{
    cotizacion.detalle = angular.copy($scope.items);
    console.log(cotizacion);
    Cotizaciones.update(cotizacion._id, cotizacion);
    $state.go("cotizaciones");
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
			if(!isNaN(item.importe)){$scope.cotizacion.subtotal += item.importe};
	});
	$scope.cotizacion.iva = $scope.cotizacion.subtotal*.16;
	$scope.cotizacion.total = $scope.cotizacion.subtotal + $scope.cotizacion.iva;
};
});