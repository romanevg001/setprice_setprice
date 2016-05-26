angular.module('setprice')
.factory('loginService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/login/', {}, {
        list: { method: 'POST' }
    });
}])
.factory('logoutService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/logout/', {}, {
        logout: { method: 'POST' }
    });
}])
.factory('registService', ['$resource', function ($resource) {
    return $resource(__api + '/auth/regist/', {"format":"json"}, {
        list: { method: 'POST' }
    });
}])


;