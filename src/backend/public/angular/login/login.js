"use strict";

(function () {

    angular.module('library.management.login', [
    ])
        .factory("User", function() {
            return {
                isLogged : false
            };
        })

        .config(function ($stateProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: "/angular/login/login.html",
                    controller: "login.ctrl"
                })
            ;
        })

        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise("login");
        })

        .controller("login.ctrl", function ($scope, User, UserApi, $state) {
            $scope.loginUser = function () {
                UserApi.authorize($scope.user).then(function (resp) {
                    if(resp.data.ok == 1) {
                        angular.copy(resp.data.user, User);
                        User.isLogged = true;
                        $state.go('book-management');
                    } else {
                        angular.copy({}, User);
                        User.isLogged = false;
                    }
                })
            }
        })


    ;

})();