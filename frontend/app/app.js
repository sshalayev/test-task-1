'use strict';

angular.module('tagApp', [
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.router.state',
        'RecursionHelper',
        'toaster'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .when('/', '/main')
            .otherwise('/');
        $locationProvider.html5Mode(true);
    })

    .run(function tagAppRun($rootScope, $location, $state, $timeout) {
        $rootScope.$on('$viewContentLoaded', function() {
            $timeout(function() {
                componentHandler.upgradeAllRegistered();
            });
        });
    });
