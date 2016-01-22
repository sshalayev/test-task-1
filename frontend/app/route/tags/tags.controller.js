'use strict';

angular.module('tagApp').controller('TagsCtrl',
    ['$rootScope', '$scope', '$state', '$q', '$timeout', 'toaster', 'User',
        function TagsCtrl($rootScope, $scope, $state, $q, $timeout, toaster, User) {
            var TG = this;
            TG.showSpinner = false;

            function waitForPromises() {
                $q.all([
                        //TG.users.$promise
                    ])
                    .then(function() {
                        TG.showSpinner = false;
                    })
                    .catch(function(err) {
                        TG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            }

            waitForPromises();

        }]);
