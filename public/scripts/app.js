'use strict';


var app = angular.module('TypingApp', [
        'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "partials/home.html",
                controller: "HomeCtrl"
            })
            .state('about', {
                url: '/about',
                templateUrl: "partials/about.html",
                controller: "AboutCtrl"
            })
            .state('login', {
                url: '/login',
                templateUrl: "partials/login.html",
                controller: "LoginCtrl"
            })
            .state('register', {
                url: '/register',
                templateUrl: "partials/register.html",
                controller: "RegisterCtrl"
            })
            .state('app', {
                url: '/typing-app',
                templateUrl: "partials/app.html",
                controller: "AppCtrl"
            })
            .state('logout', {
                url: '/logout',
                template: "<h1>Loging Out</h1>",
                controller: "LogoutCtrl"
            })

        $urlRouterProvider.otherwise('/');

    })

.run(['$window', '$state', '$rootScope', function($window, $state, $rootScope) {
        if (!$rootScope.loginStatus) {
            $state.go('login');
        } else {
            $state.go('app');
        }
    // })

}])
