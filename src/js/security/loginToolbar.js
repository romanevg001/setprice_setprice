angular.module('setprice')
.directive('vaLoginToolbar', ['$document', '$state', 'logoutService', '$localStorage', function ($document,  $state, logoutService, $localStorage) {
    return {
        templateUrl: 'templates/security/loginToolbar.tpl.html',
        restrict: 'E',
        replace: true,
        scope: true,
        link: function ($scope, $element, $attrs, $controller) {

            $scope.user = $localStorage.setpriceUser || {};

            $scope.logout = function () {
                delete $localStorage.setpriceUser;
                logoutService.out();
            }
        }
    }
}]);