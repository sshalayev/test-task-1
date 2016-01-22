'use strict';

angular.module('tagApp').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('teams', {
                url: '/teams',
                templateUrl: 'app/route/teams/teams.html',
                controller: 'TeamsCtrl',
                controllerAs: 'TM'
            });

    }]);