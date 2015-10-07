angular.module("app").controller("ordenCompraVerCtrl", function($scope, $meteor, $state, $stateParams)
{
$scope.cotizacion = Cotizaciones.findOne({_id:$stateParams._id});
var cotAgrupadas = _.groupBy($scope.cotizacion.detalle, 'proveedor_id');
$scope.ordenPorProveedor = _.map(cotAgrupadas, function(orden, key){ return orden; });
console.log($scope.ordenPorProveedor);

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
    
    $scope.crearPdf = function(key){
    	var pdf = new jsPDF('p','pt', 'letter');
      var specialElementHandlers = { 
        '#editor': function (element, renderer) { 
            return true;
        } 
    };
        pdf.fromHTML($('#content'+key).html(), 75, 20, { 
          'width': 522, 
              'elementHandlers': specialElementHandlers
      }); 
      pdf.save('orden-compra.pdf'); 
    };
});
