angular.module("app").controller("requisicionesCtrl", function($scope, $meteor, $state, $stateParams)
    { 
        $scope.articulos = $meteor.collection(Articulos);
        $scope.clientes = $meteor.collection(Clientes);
        $scope.requisiciones = $meteor.collection(function() { return Requisiciones.find({estatus:true})});
        $scope.action = true;
        $scope.requisicion = {};
        var empty_item = {
            cantidad: 0,
        };

        $scope.items = [angular.copy(empty_item)];
        $scope.save = function(requisicion)
        {
            requisicion.detalle = angular.copy($scope.items);
            requisicion.estatus = true;
            console.log(requisicion);
            $scope.requisiciones.save(requisicion);
            $state.go("requisiciones",{reload:true});
            $scope.myForm.$setUntouched();
            $scope.requisicion= {};
        };

        $scope.editar = function(id)
         {

            $scope.requisicion = Requisiciones.findOne({_id:id});
            $scope.items = $scope.requisicion.detalle;
            $scope.action = false;
            //$('.collapse').collapse('show');
         };

        $scope.remove = function(requisicion)
        {
            requisicion.estatus = false;
            $scope.requisiciones.save(requisicion);
            $state.go("requisiciones");
        };
        
        $scope.removeAll = function()
        {
            $scope.requisiciones.remove();
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
        $scope.nombreCliente = function(requisicion){
          var cliente = Clientes.findOne({_id:requisicion.cliente_id});
           return cliente.nombre;
        };
    });
angular.module("app").controller("requisicionesVerCtrl", function($scope, $meteor, $state, $stateParams)
{ 
    $scope.requisicion = $meteor.object(Requisiciones, $stateParams._id,false);

    $scope.nombreCliente = function(cliente_id){
          var cliente = Clientes.findOne({_id:cliente_id});
           return cliente.nombre;
        };
    $scope.nombreArticulo = function(articulo_id){
      var articulo = Articulos.findOne({_id:articulo_id});
       return articulo.nombre;
    };
});

angular.module("app").controller("requisicionesEnviarCtrl", function($scope, $meteor, $state, $stateParams)
{
    $scope.asdasd = $meteor.collection(RequisicionesToProveedores);
    $scope.enviadas = $meteor.collection(function(){ return RequisicionesToProveedores.find({requisicion_id:$stateParams._id})});
    $scope.proveedores = $meteor.collection(Proveedores);
    $scope.enviarRequisicion = {};

    $scope.save = function(enviarRequisicion){
        angular.forEach(enviarRequisicion.proveedores, function(proveedor_id){
            var proveedor = Proveedores.findOne({_id:proveedor_id});
            Meteor.call('sendEmail',
            proveedor.correo,
            'shabel.masoft@gmail.com',
            'Requisicion Shabel',
            'http://localhost:3000/#/requisiciones/'+$stateParams._id);
        });
        
        enviarRequisicion.fecha = new Date();
        enviarRequisicion.requisicion_id = $stateParams._id;
        $scope.enviadas.save(enviarRequisicion);
        //RequisicionesToProveedores.insert(enviarRequisicion);
        $scope.myForm.$setUntouched();
    };

    $scope.removeAll = function(){
        $scope.asdasd.remove();
        $state.go('requisicionesEnviar', { _id: $stateParams._id }, { reload: true });
    }
    $scope.nombreProveedor = function(proveedor_id){
      var proveedor = Proveedores.findOne({_id:proveedor_id});
       return proveedor.nombre;
    };
});