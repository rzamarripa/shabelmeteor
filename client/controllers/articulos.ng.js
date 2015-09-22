angular.module("app").controller("articulosCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.articulos = $meteor.collection(Articulos);

        $scope.save = function(articulo)
        {
             $scope.articulos.save(articulo);
             $scope.myForm.$setUntouched();
             $state.go("articulos");
        };

        $scope.update = function(id)
        {
            $scope.articulo = Articulos.findOne({_id:id});
            $scope.action = false;
            $state.go("articulos");
            //$('.collapse').collapse('show');
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