angular.module('setprice')
	.controller('contactsCtrl', ['$scope', 'contactsService', function ($scope, contactsService) {

		$scope.error = false;
		$scope.progress = true;

		$scope.allContacts = [];

		// Try get list of contacts
		contactsService.list({},function(data){
			$scope.progress = false;
			console.log(data)

			$scope.allContacts = data;

		},function(err){
			$scope.progress = false;
			$scope.error = true;
		})

	}])

	.config([ '$stateProvider', '$httpProvider',
		function ($stateProvider, $httpProvider) {


			$stateProvider.state('contacts', {
				url: '/contacts',
				templateUrl: 'templates/contacts/contacts-list.tpl.html',
				controller: 'contactsCtrl'

			})

		}])



;

