angular.module('app')
    .config(function($routeProvider,$routeSegmentProvider,$locationProvider) {
        $locationProvider.html5Mode(true);
    });