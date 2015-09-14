angular.module("app").controller("requisicionesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.articulos = $meteor.collection(Articulos);
        $scope.clientes = $meteor.collection(Clientes);
        $scope.requisiciones = $meteor.collection(Requisiciones);
        $scope.action = true;
        var empty_item = {
            cantidad: 0,
        };

        $scope.items = [angular.copy(empty_item)];
        $scope.save = function(requisicion)
        {
            requisicion.detalle = $scope.items;
            $scope.requisiciones.save(requisicion);
            $state.go("requisiciones");
        };

        $scope.editar = function(id)
         {
            $scope.requisicion = Requisiciones.findOne({_id:id});
            //$meteor.object(Requisiciones, id,false);
            $scope.items = $scope.requisicion.detalle;
            $scope.action = false;
            //$scope.action = false;
            //$('.collapse').collapse('show');
         };

        $scope.remove = function(requisicion)
        {
            requisicion.estatus = false;
            $scope.requisiciones.save(requisicion);
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
        $scope.selected = function(variable1, variable2){
            if(variable1 == variable2)return 'selected';
        };
        $(document).ready(function() {
            $(".select2").select2();   
        });
    });