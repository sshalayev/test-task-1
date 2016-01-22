'use strict';

angular.module('tagApp').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: 'app/route/tags/tags.html',
                controller: 'TagsCtrl',
                controllerAs: 'TG'
            });

    }]);