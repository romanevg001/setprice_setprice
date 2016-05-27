angular.module('setprice')
	.controller('contactsCtrl', ['$scope', 'contactsService', '$state', function ($scope, contactsService, $state) {

		$scope.error = false;
		$scope.progress = true;

		$scope.allContacts = [];

		// Try get list of contacts
		$scope.update = function(){
			contactsService.list({},function(data){
				$scope.progress = false;
				$scope.allContacts = data.results;

			},function(err){
				$scope.progress = false;
				$scope.error = err.statusText;
			});
		}
		$scope.update();


		// edit contact
		$scope.onContactEdit = function(item){
			$state.go('contactsDetail',{"id":item.id});
		}

		//del contact
		$scope.onContactDel = function(item){

			contactsService.delete({"id":item.id},function(data){
				$scope.progress = false;
				$scope.update();
			},function(err){
				$scope.progress = false;
				$scope.error = err.statusText;
			});
		}

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

