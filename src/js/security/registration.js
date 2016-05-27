
angular.module('setprice')
    .config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {

        $stateProvider.state('registration', {
            url: '/registration',
            templateUrl: 'templates/security/registration.tpl.html',
            controller: ['$rootScope', '$scope', 'registService', '$state', '$localStorage',
                function ($rootScope, $scope, registService, $state, $localStorage) {

                $scope.user = {};
                $scope.error = null;

                $scope.progress = false;
                $scope.successMessage = false;

                $scope.ok = function(){
                    // Try to reg
                    $scope.progress = false;
                    registService.list($scope.user,function(data){
                        $scope.progress = false;
                        $localStorage.setpriceUser = data;
                        $state.go('login');
                    });
                };



            }]
        });
    }])
   ;