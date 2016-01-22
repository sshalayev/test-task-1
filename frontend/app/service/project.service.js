'use strict';

angular.module('tagApp')
    .factory('Project', ['$resource', function ProjectService($resource) {

        return $resource('/api/project/:key1/:key2', {
                key1: '@key1',
                key2: '@key2'
            },
            {
                create: {
                    method: 'POST'
                },
                getAll: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                getByTag: {
                    method: 'GET',
                    params: {
                        key1: 'tag'
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