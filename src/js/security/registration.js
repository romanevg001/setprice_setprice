
angular.module('setprice')
    .config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {

        $stateProvider.state('registration', {
            url: '/registration',
            templateUrl: 'templates/security/registration.tpl.html',
            controller: ['$rootScope', '$scope', 'registService', '$state', function ($rootScope, $scope, registService,$state) {

                $scope.user = {};
                $scope.error = null;

                $scope.progress = false;
                $scope.successMessage = false;

                $scope.ok = function(){
                    // Try to reg
                    $scope.progress = false;
                    registService.list($scope.user,function(data){
                        $scope.progress = false;


                    });
                };



            }]
        });
    }])
   ;