var app = angular.module('app',['ngRoute','route-segment','view-segment','ngAnimate','ctrls','directives','duScroll','services'])
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 30);

app.run(function ($rootScope,ConnectionService) {
    if(localStorage.getItem('lang')==null){
        localStorage.setItem('lang',navigator.language);
        $rootScope.language = navigator.language;
    }else {
        $rootScope.language = localStorage.getItem('lang');
    }
    ConnectionService.loadLanguagePack($rootScope);
    ConnectionService.loadSteps($rootScope);
    ConnectionService.loadProjects($rootScope);
    ConnectionService.loadDoList($rootScope);
    // ConnectionService.sendMessage('mes');
});