angular.module('setprice')
.factory('loginService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/login/?format=json', {}, {
        list: { method: 'POST' }
    });
}])
.factory('logoutService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/logout/?format=json', {}, {
        out: { method: 'POST' }
    });
}])
.factory('registService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/regist/?format=json', {}, {
        list: { method: 'POST' }
    });
}])


;