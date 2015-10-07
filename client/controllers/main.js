angular.module("app").controller("mainCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.nombreEmpresa = function(){
            var nombreEmpresa = Empresas.findOne({_id:$scope.currentUser.empresa_id});
            return nombreEmpresa.nombre;
        }
    });