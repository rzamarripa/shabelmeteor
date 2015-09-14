angular.module("app").controller("clientesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.clientes = $meteor.collection(Clientes);

        $scope.save = function(cliente)
        {
             $scope.clientes.save(cliente);
             $state.go("clientes");
        };

        $scope.update = function(id)
        {
            //obtenemos el articulo y lo tenemos disponible para hacer operaciones en vivo
            $scope.cliente = Clientes.findOne({_id:id});
            //$meteor.object(Clientes, id,false);
            $state.go("clientes");
        };
        
        $scope.remove = function(cliente)
        {
            $scope.clientes.remove(cliente);
        };
    });