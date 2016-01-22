'use strict';

angular.module('tagApp')
    .factory('Tag', ['$resource', function TagService($resource) {

        return $resource('/api/tag/:key1/:key2/:key3', {
                key1: '@key1',
                key2: '@key2'
            },
            {
                create: {
                    method: 'POST'
                },
                loadForProject: {
                    method: 'GET',
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