angular.module("app").controller("clientesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.clientes = $meteor.collection(function(){return Clientes.find({estatus: true})});
        $scope.action = true;
        $scope.save = function(cliente)
        {
            cliente.estatus = true;
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
        };
        
        $scope.limpiar = function(){
            $scope.cliente = '';
            $scope.myForm.$setUntouched();
            $scope.action = true;
        }

        $scope.remove = function(cliente)
        {
            cliente.estatus = false;
            $scope.clientes.save(cliente);
        };
    });