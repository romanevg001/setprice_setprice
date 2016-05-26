﻿angular.module('setprice')
.directive('vaLoginToolbar', ['$document', '$state', 'logoutService', function ($document,  $state, logoutService) {
    return {
        templateUrl: 'templates/security/loginToolbar.tpl.html',
        restrict: 'E',
        replace: true,
        scope: true,
        link: function ($scope, $element, $attrs, $controller, logoutService) {
            //$scope.openProfile = function () {
            //    $state.go('workspace.userProfile');
            //};

            //$scope.isAuthenticated = authService.isAuthenticated;
            $scope.logout = logoutService.logout;
            //$scope.$watch(function () {
            //    return authService.userLogin;
            //}, function (userLogin) {
            //    $scope.userLogin = userLogin;
            //    $scope.fullName = authService.fullName;
            //});

            // menu stuff
            //var onDocumentClick = function (event) {
            //    //$scope.isMenuVisible = false;
            //    $scope.$apply("isMenuVisible = false");
            //    $document.off("click", onDocumentClick);
            //};
            //
            //$scope.showMenu = function () {
            //    $document.off("click", onDocumentClick);
            //    $scope.isMenuVisible = !$scope.isMenuVisible;
            //    if ($scope.isMenuVisible) {
            //        $timeout(function () {
            //            $document.on("click", onDocumentClick);
            //        });
            //    }
            //}
        }
    }
}])