angular.module("app").controller("proveedoresCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.proveedores = $meteor.collection(function(){return Proveedores.find({estatus:true})});
        $scope.action = true;
        $scope.save = function(proveedor)
        {
            proveedor.estatus = true;
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
        };
        $scope.limpiar = function(){
            $scope.proveedor = '';
            $scope.myForm.$setUntouched();
            $scope.action = true;
        }
        $scope.remove = function(proveedor)
        {
            proveedor.estatus = false;
            $scope.proveedores.save(proveedor);
        };
    });