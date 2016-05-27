angular.module('setprice')
.config([ '$stateProvider', '$httpProvider',
	function ($stateProvider, $httpProvider) {


	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/security/login.tpl.html',
		controller: ['$scope', 'loginService', '$localStorage', '$state',
			function ($scope, loginService, $localStorage, $state) {

			$scope.user = $localStorage.setpriceUser || {};

			$scope.progress = false;
			$scope.error = false;

			$scope.login = function () {
				$scope.progress = true;

				// Try to login
				loginService.list($scope.user, function(data){
					$scope.progress = false;
					$localStorage.setpriceUser = data;
					$state.go('contacts');

				},function(err){
					$scope.progress = false;
					$scope.error = err.statusText;
				})
			}
		}]
	})
}]);