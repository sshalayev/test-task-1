'use strict';

angular.module('tagApp').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/route/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'MN'
            });

    }]);