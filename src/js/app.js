
(function(){
    window.__api = "http://sptest.goldshtein.org/api";

    var app = angular.module('setprice', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngStorage',
        'ui.mask'
    ]);


    app.controller('setprice.appCtrl', [
        function() {
        }
    ]);



    app.config([ '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.useXDomain = true;

            $urlRouterProvider.otherwise('/login');
        }
    ]);

    window.app = app;


})();
