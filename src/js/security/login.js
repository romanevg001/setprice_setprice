angular.module('setprice')
.config([ '$stateProvider', '$httpProvider',
	function ($stateProvider, $httpProvider) {


	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/security/login.tpl.html',
		controller: ['$scope', 'loginService', function ($scope, loginService) {

			$scope.user = {};

			$scope.progress = false;
			$scope.error = false;


			$scope.login = function () {
				$scope.progress = true;


				// Try to login
				loginService.list($scope.user, function(data){
					$scope.progress = false;


				},function(err){
					$scope.progress = false;
					$scope.error = true;
				})

			}



		}]

	})

}]);