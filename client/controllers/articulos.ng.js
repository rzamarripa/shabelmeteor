angular.module("app").controller("articulosCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.articulos = $meteor.collection(Articulos);

        $scope.save = function(articulo)
        {
             $scope.articulos.push(articulo);
             $state.go("articulos");
        };

        $scope.edit = function()
        {
            $scope.articulo = $meteor.object(articulos, $stateParams.articuloId);
            $scope.update = function()
            {
                $scope.articulo.save();
                $state.go("articulos");
            }
        };
        
        $scope.remove = function(articulo)
        {
            $scope.articulos.remove(articulo);
        };
        
        $scope.removeAll = function()
        {
            $scope.articulos.remove();
        };
    });