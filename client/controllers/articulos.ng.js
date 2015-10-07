angular.module("app").controller("articulosCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.articulos = $meteor.collection(function(){return Articulos.find({estatus:true})});
        $scope.action = true;
        $scope.save = function(articulo)
        {
            articulo.estatus = true;
             $scope.articulos.save(articulo);
             $scope.myForm.$setUntouched();
             $state.go("articulos");
             $('.collapse').collapse('hide');
             $scope.action = true;
        };

        $scope.update = function(id)
        {
            $scope.articulo = Articulos.findOne({_id:id});
            $scope.action = false;
            $state.go("articulos");
            $('.collapse').collapse('show');
        };
        
        $scope.remove = function(articulo)
        {
            articulo.estatus = false;
            $scope.articulos.save(articulo);
        };
        
        $scope.limpiar = function(){
            $scope.articulo = '';
            $scope.action = true;
            $scope.myForm.$setUntouched();
            $('.collapse').collapse('hide');
        }

        $scope.removeAll = function()
        {
            $scope.articulos.remove();
        };
    });