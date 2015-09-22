angular.module("app").controller("proveedoresCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.proveedores = $meteor.collection(Proveedores);
        $scope.action = true;
        $scope.save = function(proveedor)
        {
             $scope.proveedores.save(proveedor);
             $scope.action = true;
             $scope.myForm.$setUntouched();
             $state.go("proveedores");
        };

        $scope.update = function(id)
        {
            //obtenemos el articulo y lo tenemos disponible para hacer operaciones en vivo
            //$meteor.object(proveedores, id,false);
            $scope.proveedor = Proveedores.findOne({_id:id});
            $scope.action = false;
            $state.go("proveedores");
            $('.collapse').collapse('show');
        };
        
        $scope.remove = function(proveedor)
        {
            $scope.proveedores.remove(proveedor);
        };
    });