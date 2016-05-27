angular.module('setprice')
	.controller('contactsDetailCtrl', ['$scope', 'contactsService', '$state', '$stateParams', function ($scope, contactsService, $state,  $stateParams) {
console.log( $state)
console.log( $stateParams.id)
		$scope.error = false;
		$scope.progress = false;

		$scope.contact = {};
		$scope.contact.phones = [];

		function getParams (){
			let params = angular.copy($scope.contact);
			params.phones = [];
			//params.contactsId = params.id;
			_.each($scope.contact.phones, function(item){
				params.phones.push("+7"+item);
			});
			return params;
		}

		function deserialise (data){
			let res = angular.copy(data);
			delete res.url;
			if (data.phones != undefined) {

				res.phones = [];
				_.each(data.phones, function(item){
					res.phones.push(item.toString().slice(2));

				});
			}
			return res
		}

		if( $stateParams.id){ // get for edit
			$scope.progress = true;

			contactsService.list({"id":$stateParams.id},function(data){
				$scope.progress = false;
				$scope.contact = deserialise(data)

			},function(err){
				$scope.progress = false;
				$scope.error = err.statusText;
			});
		}


		$scope.ok = function(){
			$scope.progress = true;
			contactsService.add(getParams(), function(data){
				$scope.progress = false;
				$state.go('contacts');
			},function(err){
				$scope.progress = false;
				$scope.error = err.statusText;
			})


		}

	}])

	.config([ '$stateProvider', '$httpProvider',
		function ($stateProvider, $httpProvider) {

			$stateProvider
					.state('contactsDetail', {
						url: '/contacts/detail/:id',
						templateUrl: 'templates/contacts/contacts-detail.tpl.html',
						controller: 'contactsDetailCtrl'
					})
					.state('contactsDetailNew', {
						url: '/contacts/detail/',
						templateUrl: 'templates/contacts/contacts-detail.tpl.html',
						controller: 'contactsDetailCtrl'
					})
		}])

;

