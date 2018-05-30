'use strict';
var app = angular.module('SmartWatermeterApp', ['ui.router', 'ngRoute']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'app/views/mainView.html',
            controller: 'mainViewController'
        });

        
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        $state.go('welcome');
    });
}]);