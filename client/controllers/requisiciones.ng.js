angular.module("app").controller("requisicionesCtrl", function($scope, $meteor, $state, $stateParams)
    {
        $scope.articulos = $meteor.collection(function() { return Articulos.find({estatus:true})});
        $scope.clientes = $meteor.collection(function() { return Clientes.find({estatus:true})});
        $scope.requisiciones = $meteor.collection(function() { return Requisiciones.find({estatus:true,empresa_id:$scope.currentUser.empresa_id})});
        $scope.action = true;
        $scope.requisicion = {};
        
        var empty_item = {
            cantidad: 0,
        };

        $scope.items = [angular.copy(empty_item)];
        
        $scope.save = function(requisicion)
        {
            requisicion.detalle = angular.copy($scope.items);
            requisicion.estatus = true;
            requisicion.empresa_id = $scope.currentUser.empresa_id;
            if(!$scope.action){
                requisicion.updatedBy = $scope.currentUser._id;
            }else{
                requisicion.createdBy = $scope.currentUser._id;
            }
            console.log(requisicion);
            $scope.requisiciones.save(requisicion);
            $state.go("requisiciones");
            $scope.myForm.$setUntouched();
            $scope.requisicion= {};
            $scope.items = [angular.copy(empty_item)];
            $scope.action = true;
            $('.collapse').collapse('hide');
        };

        $scope.editar = function(id)
         {
            $scope.requisicion = Requisiciones.findOne({_id:id});
            $scope.items = $scope.requisicion.detalle;
            $scope.action = false;
            $('.collapse').collapse('show');
         };
         $scope.limpiar = function(){
            $scope.requisicion = {};
            $scope.items = [angular.copy(empty_item)];
            $scope.myForm.$setUntouched();
            $scope.action = true;
            $('.collapse').collapse('hide');
        }
        $scope.remove = function(requisicion)
        {
            requisicion.estatus = false;
            $scope.requisiciones.save(requisicion);
            $state.go("requisiciones");
        };
        
        $scope.removeAll = function()
        {
            $scope.requisiciones.remove();
        };
       
        $scope.addItem = function() {

            $scope.items.push(angular.copy(empty_item));
        };
        
        $scope.cancelar = function (item, e) {
            e.preventDefault();
            var c = confirm('¿Está seguro de remover este artículo?');
            if (!c) return;
            var i = $scope.items.indexOf(item);
            if (i >= 0) $scope.items.splice(i, 1);
        };
        $scope.nombreCliente = function(requisicion){
          var cliente = Clientes.findOne({_id:requisicion.cliente_id});
           return cliente.nombre;
        };
    });
angular.module("app").controller("requisicionesVerCtrl", function($scope, $meteor, $state, $stateParams)
{ 
    $scope.requisicion = $meteor.object(Requisiciones, $stateParams._id,false);

    $scope.nombreCliente = function(cliente_id){
          var cliente = Clientes.findOne({_id:cliente_id});
           return cliente.nombre;
        };
    $scope.nombreArticulo = function(articulo_id){
      var articulo = Articulos.findOne({_id:articulo_id});
       return articulo.nombre;
    };
    $scope.crearPdf = function(){
        var pdf = new jsPDF('p','pt', 'letter');
        var specialElementHandlers = { 
            '#editor': function (element, renderer) { 
                return true;
            } 
        };
        pdf.fromHTML($('#content').html(), 75, 20, { 
            'width': 522, 
                'elementHandlers': specialElementHandlers
        }); 
        pdf.save('requisicion.pdf'); 
    };
});

angular.module("app").controller("requisicionesEnviarCtrl", function($scope, $meteor, $state, $stateParams)
{
    $scope.enviadas = $meteor.collection(function(){ return RequisicionesToProveedores.find({requisicion_id:$stateParams._id})});
    $scope.proveedores = $meteor.collection(function() { return Proveedores.find({estatus:true})});
    $scope.enviarRequisicion = {};

    $scope.save = function(enviarRequisicion){
        angular.forEach(enviarRequisicion.proveedores, function(proveedor_id){
            var data = {
              name: "Valentin"
            };
            var html = Blaze.toHTMLWithData(Template.sample,data);
            var proveedor = Proveedores.findOne({_id:proveedor_id});
            Meteor.call('sendEmail',
            proveedor.correo,
            'shabel.masoft@gmail.com',
            'Requisicion Shabel',
            html);
        });
        
        enviarRequisicion.fecha = new Date();
        enviarRequisicion.requisicion_id = $stateParams._id;
        enviarRequisicion.createdBy = $scope.currentUser._id;
        $scope.enviadas.save(enviarRequisicion);
        //RequisicionesToProveedores.insert(enviarRequisicion);
        $scope.myForm.$setUntouched();
    };

    $scope.removeAll = function(){
        $scope.asdasd.remove();
        $state.go('requisicionesEnviar', { _id: $stateParams._id }, { reload: true });
    }
    $scope.nombreProveedor = function(proveedor_id){
      var proveedor = Proveedores.findOne({_id:proveedor_id});
       return proveedor.nombre;
    };
});