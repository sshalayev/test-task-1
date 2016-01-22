'use strict';

angular.module('tagApp').controller('ProjectsCtrl',
    ['$rootScope', '$scope', '$state', '$q', '$timeout', 'toaster', 'User', 'Project',
        function ProjectsCtrl($rootScope, $scope, $state, $q, $timeout, toaster, User, Project) {
            var PRG = this;
            PRG.showSpinner = true;
            PRG.showAdd = false;
            PRG.newProject = {
                'creator_id': null,
                name: ''
            };

            PRG.users = User.getAll();
            PRG.projects = Project.getAll();

            PRG.editOn = function(record) {
                PRG.projects.forEach(function(rec) {
                    rec.isEdit = false;
                });
                record.isEdit = true;
            };

            PRG.getCreatorName = function(id) {
                var name = 'Unknown';
                PRG.users.forEach(function(item) {

                    if (item.id === id) {

                        name = item.full_name;
                    }
                });
                return name;
            };

            PRG.saveProject = function(record) {
                PRG.showSpinner = true;
                Project.update({
                    key1: record.id
                }, {
                    name: record.name
                }).$promise
                    .then(function() {
                        PRG.showSpinner = false;
                        record.isEdit = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Project record successfully updated'
                        });
                    })
                    .catch(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            PRG.addProject = function(record) {
                PRG.showSpinner = true;
                Project.create({
                    key1: PRG.newProject['creator_id']
                }, {
                    name: PRG.newProject.name
                }).$promise
                    .then(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Project record successfully created'
                        });
                        PRG.showAdd = false;
                        PRG.newProject = {
                            'creator_id': null,
                            name: ''
                        };
                        PRG.projects = Project.getAll();
                        waitForPromises();
                    })
                    .catch(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            PRG.saveProject = function(record) {
                PRG.showSpinner = true;
                Project.update({
                    key1: record.id
                }, {
                    name: record.name
                }).$promise
                    .then(function() {
                        PRG.showSpinner = false;
                        record.isEdit = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Project record successfully updated'
                        });
                    })
                    .catch(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            PRG.deleteProject = function(record) {
                PRG.showSpinner = true;
                Project.delete({
                    key1: record.id
                }).$promise
                    .then(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Record successfully removed'
                        });
                        PRG.projects = Project.getAll();
                        waitForPromises();
                    })
                    .catch(function() {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            function waitForPromises() {
                $q.all([
                        PRG.users.$promise,
                        PRG.projects.$promise
                    ])
                    .then(function() {
                        PRG.showSpinner = false;
                    })
                    .catch(function(err) {
                        PRG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            }

            waitForPromises();

        }]);
