angular.module('setprice')

.factory('contactsService', ['$resource', function ($resource) {
    return $resource(__api + '/contacts/:id/?format=json', {id:'@id'}, {
        list: { method: 'GET' },
        add: { method: 'POST' },
        delete: { method: 'DELETE' }
    });
}])





;