'use strict';

angular.module('tagApp')
    .factory('User', ['$resource', function UserService($resource) {

        return $resource('/api/user/:key1/:key2', {
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