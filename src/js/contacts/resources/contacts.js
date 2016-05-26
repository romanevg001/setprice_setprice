angular.module('setprice')
.factory('contactsService', ['$resource', function ($resource) {
    return $resource(__api + '/contacts', {}, {
        list: { method: 'GET' }
    });
}])


;