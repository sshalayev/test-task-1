'use strict';

angular.module('tagApp')
    .factory('Member', ['$resource', function MemberService($resource) {

        return $resource('/api/member/:key1/:key2', {
                key1: '@key1',
                key2: '@key2'
            },
            {
                create: {
                    method: 'POST'
                },
                get: {
                    method: 'GET'
                },
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                }
            });

    }]);