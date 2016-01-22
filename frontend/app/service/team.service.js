'use strict';

angular.module('tagApp')
    .factory('Team', ['$resource', function TeamService($resource) {

        return $resource('/api/team/:key1/:key2/:key3', {
                key1: '@key1',
                key2: '@key2',
                key3: '@key3'
            },
            {
                create: {
                    method: 'POST'
                },
                loadForProject: {
                    method: 'GET',
                    params: {
                        key1: 'project',
                        key3: 'members'
                    },
                    isArray: true
                },
                get: {
                    method: 'GET',
                    params: {
                        key1: 'project'
                    }
                },
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                }
            });

    }]);