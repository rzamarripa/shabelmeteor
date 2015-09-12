angular.module("app").controller("clientesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.clientes = $meteor.collection(Clientes);

        $scope.save = function(cliente)
        {
             $scope.clientes.push(cliente);
             $state.go("clientes");
        };

        $scope.edit = function()
        {
            //obtenemos el articulo y lo tenemos disponible para hacer operaciones en vivo
            $scope.cliente = $meteor.object(clientes, $stateParams.clienteId);
            $scope.update = function()
            {
                //actualizamos el articulo
                $scope.cliente.save();
                $state.go("clientes");
            }
        };
        
        $scope.remove = function(cliente)
        {
            $scope.clientes.remove(cliente);
        };
        
        $scope.removeAll = function()
        {
            $scope.clientes.remove();
        };
    });