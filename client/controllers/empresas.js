angular.module("app").controller("empresasCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.empresas = $meteor.collection(function(){return Empresas.find({estatus:true})});
        $scope.action = true;
        $scope.save = function(empresa)
        {
            empresa.estatus = true;
             $scope.empresas.save(empresa);
             $scope.myForm.$setUntouched();
             $state.go("empresas");
             $('.collapse').collapse('hide');
             $scope.action = true;
        };

        $scope.update = function(id)
        {
            $scope.empresa = Empresas.findOne({_id:id});
            $scope.action = false;
            $state.go("empresas");
            $('.collapse').collapse('show');
        };
        
        $scope.remove = function(empresa)
        {
            empresa.estatus = false;
            $scope.empresas.save(empresa);
        };
        
        $scope.limpiar = function(){
            $scope.empresa = '';
            $scope.action = true;
            $scope.myForm.$setUntouched();
            $('.collapse').collapse('hide');
        }

        $scope.removeAll = function()
        {
            $scope.empresas.remove();
        };
    });



angular.module("app").controller("empresasCambiarCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.empresas = $meteor.collection(function(){return Empresas.find({estatus:true})});

        $scope.action = true;
        $scope.save = function(usuarioempresa, empresa_id)
        {
            Meteor.users.update(Meteor.userId(), { $set: { empresa_id: empresa_id }} );
            $state.go("empresasCambiar");
        };
    });