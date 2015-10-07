        angular.module("app").run(["$rootScope", "$location", function($rootScope, $state) {
          $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireUser promise is rejected
            // and redirect the user back to the main page
            if (error === "AUTH_REQUIRED") {
              $state.go("login");
            }
          });
        }]);
        angular.module("app").config(function($urlRouterProvider, $stateProvider, $locationProvider)
        {
            $locationProvider.html5Mode(true);
            $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'client/views/users/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
              })
              .state('register',{
                url: '/register',
                templateUrl: 'client/views/users/register.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
              })
              .state('resetpw', {
                url: '/resetpw',
                templateUrl: 'client/views/users/reset-password.ng.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
              })
              .state('logout', {
                url: '/logout',
                resolve: {
                  "logout": ['$meteor', '$state', function($meteor, $state) {
                    return $meteor.logout().then(function(){
                      $state.go('login');
                    }, function(err){
                      console.log('logout error - ', err);
                    });
                  }]
                }
              })
            //////Articulos/////////
            .state('articulos', {
                url: '/articulos',
                templateUrl: 'client/views/articulos/index.ng.html',
                controller: 'articulosCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('articulosAdd', {
                url: '/articulos-add',
                templateUrl: 'client/views/articulos/form.ng.html',
                controller: 'articulosCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('articulosEdit', {
                url: '/articulos/edit/:articuloId',
                templateUrl: 'client/views/articulos/update.ng.html',
                controller: 'articulosCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            //////Clientes////////////    
            .state('clientes', {
                url: '/clientes',
                templateUrl: 'client/views/clientes/index.ng.html',
                controller: 'clientesCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            //////Proveedores////////
            .state('proveedores', {
                url: '/proveedores',
                templateUrl: 'client/views/proveedores/index.ng.html',
                controller: 'proveedoresCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            //////Requisiciones//////
            .state('requisiciones', {
                url: '/requisiciones',
                templateUrl: 'client/views/requisiciones/index.ng.html',
                controller: 'requisicionesCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('requisicionesVer', {
                url: '/requisiciones/:_id',
                templateUrl: 'client/views/requisiciones/ver.ng.html',
                controller: 'requisicionesVerCtrl'
            })
            .state('requisicionesEnviar', {
                url: '/requisiciones/enviar/:_id',
                templateUrl: 'client/views/requisiciones/enviar.ng.html',
                controller: 'requisicionesEnviarCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            /////Cotizaciones//////
            .state('cotizacionCreate', {
                url: '/cotizaciones/create/:_id',
                templateUrl: 'client/views/cotizaciones/create.ng.html',
                controller: 'cotizacionesCtrl',
                resolve:{
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }],
                    requisicion: function($stateParams){
                        Session.set('requisicion',Requisiciones.findOne({_id:$stateParams._id},{fields:{_id:0,fecha:0,comentarios:0}}));
                        return {value: Session.get('requisicion')};
                    }
                }
            })
            .state('cotizacionUpdate', {
                url: '/cotizaciones/update/:_id',
                templateUrl: 'client/views/cotizaciones/create.ng.html',
                controller: 'cotizacionesUpdateCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('cotizacionVer', {
                url: '/cotizaciones/:_id',
                templateUrl: 'client/views/cotizaciones/ver.ng.html',
                controller: 'cotizacionesVerCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('cotizaciones', {
                url: '/cotizaciones',
                templateUrl: 'client/views/cotizaciones/index.ng.html',
                controller: 'cotizacionesIndexCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            /////Empresas/////
            .state('empresas', {
                url: '/empresas',
                templateUrl: 'client/views/empresas/index.ng.html',
                controller: 'empresasCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            .state('empresasCambiar', {
                url: '/empresas/cambiar',
                templateUrl: 'client/views/empresas/cambiar.ng.html',
                controller: 'empresasCambiarCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            })
            /////Orden Compra/////
            .state('ordenCompraVer', {
                url: '/ordenCompra/ver/:_id',
                templateUrl: 'client/views/ordenCompra/ver.ng.html',
                controller: 'ordenCompraVerCtrl',
                resolve: {
                  "currentUser": ["$meteor", function($meteor){
                    return $meteor.requireUser();
                  }]
                }
            });
        $urlRouterProvider.otherwise('/articulos');
    });

angular.module("app").directive('uiSelectRequired', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {
        return modelValue && modelValue.length;
      };
    }
  };
});