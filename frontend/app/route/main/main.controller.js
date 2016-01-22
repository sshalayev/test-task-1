'use strict';

angular.module('tagApp').controller('MainCtrl',
    ['$rootScope', '$scope', '$state', '$q', '$timeout', 'toaster', 'User',
        function MainCtrl($rootScope, $scope, $state, $q, $timeout, toaster, User) {
            var MN = this;
            MN.showSpinner = true;
            MN.showAdd = false;
            MN.newUser = {};

            MN.users = User.getAll();

            MN.editOn = function(record) {
                MN.users.forEach(function(rec) {
                    rec.isEdit = false;
                });
                record.isEdit = true;
            };

            MN.saveUser = function(record) {
                MN.showSpinner = true;
                User.update({
                    key1: record.id
                }, {
                    username: record.username,
                    full_name: record.full_name,
                    role: record.role
                }).$promise
                    .then(function() {
                        MN.showSpinner = false;
                        record.isEdit = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'User record successfully updated'
                        });
                    })
                    .catch(function() {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            MN.deleteUser = function(record) {
                MN.showSpinner = true;
                User.delete({
                    key1: record.id
                }).$promise
                    .then(function() {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Record successfully removed'
                        });
                        MN.users = User.getAll();
                        waitForPromises();
                    })
                    .catch(function() {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            MN.addUser = function(record) {
                MN.showSpinner = true;
                User.create({
                    username: MN.newUser.username,
                    full_name: MN.newUser.full_name,
                    role: MN.newUser.role
                }).$promise
                    .then(function() {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'User record successfully created'
                        });
                        MN.showAdd = false;
                        MN.users = User.getAll();
                        waitForPromises();
                    })
                    .catch(function() {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            function waitForPromises() {
                $q.all([
                    MN.users.$promise
                ])
                    .then(function() {
                        MN.showSpinner = false;
                    })
                    .catch(function(err) {
                        MN.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            }

            waitForPromises();

        }]);
