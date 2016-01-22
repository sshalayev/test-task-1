'use strict';

angular.module('tagApp').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('projects', {
                url: '/projects',
                templateUrl: 'app/route/projects/projects.html',
                controller: 'ProjectsCtrl',
                controllerAs: 'PRG'
            });

    }]);