        angular.module("app").config(function($urlRouterProvider, $stateProvider, $locationProvider)
        {
            //$locationProvider.html5Mode(true);
            $stateProvider
            //////Articulos/////////
            .state('articulos', {
                url: '/articulos',
                templateUrl: 'client/views/articulos/index.ng.html',
                controller: 'articulosCtrl'
            })
            .state('articulosAdd', {
                url: '/articulos-add',
                templateUrl: 'client/views/articulos/form.ng.html',
                controller: 'articulosCtrl'
            })
            .state('articulosEdit', {
                url: '/articulos/edit/:articuloId',
                templateUrl: 'client/views/articulos/update.ng.html',
                controller: 'articulosCtrl'
            })
            //////Clientes////////////    
            .state('clientes', {
                url: '/clientes',
                templateUrl: 'client/views/clientes/index.ng.html',
                controller: 'clientesCtrl'
            })
            .state('clientesAdd', {
                url: '/clientes-add',
                templateUrl: 'client/views/clientes/form.ng.html',
                controller: 'clientesCtrl'
            })
            .state('clientesEdit', {
                url: '/clientes/edit/:articuloId',
                templateUrl: 'client/views/clientes/update.ng.html',
                controller: 'clientesCtrl'
            })
            //////Requisiciones//////
            .state('requisiciones', {
                url: '/requisiciones',
                templateUrl: 'client/views/requisiciones/index.ng.html',
                controller: 'requisicionesCtrl'
            })
            /////Cotizaciones//////
            .state('cotizaciones', {
                url: '/cotizaciones/create/:_id',
                templateUrl: 'client/views/cotizaciones/create.ng.html',
                controller: 'cotizacionesCtrl'
            });
        $urlRouterProvider.otherwise('/articulos');
    });