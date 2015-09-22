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
            //////Proveedores////////
            .state('proveedores', {
                url: '/proveedores',
                templateUrl: 'client/views/proveedores/index.ng.html',
                controller: 'proveedoresCtrl'
            })
            //////Requisiciones//////
            .state('requisiciones', {
                url: '/requisiciones',
                templateUrl: 'client/views/requisiciones/index.ng.html',
                controller: 'requisicionesCtrl'
            })
            .state('requisicionesVer', {
                url: '/requisiciones/:_id',
                templateUrl: 'client/views/requisiciones/ver.ng.html',
                controller: 'requisicionesVerCtrl'
            })
            /////Cotizaciones//////
            .state('cotizacionCreate', {
                url: '/cotizaciones/create/:_id',
                templateUrl: 'client/views/cotizaciones/create.ng.html',
                controller: 'cotizacionesCtrl',
            })
            .state('cotizacionVer', {
                url: '/cotizaciones/:_id',
                templateUrl: 'client/views/cotizaciones/ver.ng.html',
                controller: 'cotizacionesVerCtrl',
            })
            .state('cotizaciones', {
                url: '/cotizaciones',
                templateUrl: 'client/views/cotizaciones/index.ng.html',
                controller: 'cotizacionesIndexCtrl'
            });
        $urlRouterProvider.otherwise('/articulos');
    });