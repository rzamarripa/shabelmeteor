angular.module("app").controller("clientesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.clientes = $meteor.collection(Clientes);
        $scope.action = true;
        $scope.save = function(cliente)
        {
             $scope.clientes.save(cliente);
             $scope.action = true;
             $scope.myForm.$setUntouched();
             $state.go("clientes");
        };

        $scope.update = function(id)
        {
            //obtenemos el articulo y lo tenemos disponible para hacer operaciones en vivo
            //$meteor.object(Clientes, id,false);
            $scope.cliente = Clientes.findOne({_id:id});
            $scope.action = false;
            $state.go("clientes");
            $('.collapse').collapse('show');
        };
        
        $scope.remove = function(cliente)
        {
            $scope.clientes.remove(cliente);
        };
    });