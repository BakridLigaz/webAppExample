angular.module('app')
    .config(function($routeProvider,$routeSegmentProvider,$locationProvider) {
        $routeSegmentProvider
            .when('/', 'about')
            .when('/portfolio', 'portfolio')
            .when('/working_conditions', 'conditions');
            // .when('/error', 'error');
        $routeSegmentProvider.segment('about', {
            templateUrl: '../templates/about_tmp.html',
            controller: 'MainCtrl'
        });
        $routeSegmentProvider.segment('portfolio', {
            templateUrl: '../templates/portfolio_tmp.html',
            controller: 'MainCtrl'
        });
        $routeSegmentProvider.segment('conditions', {
            templateUrl: '../templates/conditions_tmp.html',
            controller: 'MainCtrl'
        });
        // $routeSegmentProvider.segment('error', {
        //     templateUrl: '../../templates/error.html',
        //     controller: 'MainCtrl'
        // });
        // $routeProvider.otherwise({redirectTo: '/error'});//При любом другом URL попадаем на страницу ошибки
        $locationProvider.html5Mode(true);//Убираем хештеги при роутинге
    });