'use strict';

angular.module('tagApp').controller('TagsCtrl',
    ['$rootScope', '$scope', '$state', '$q', '$timeout', 'toaster', 'User', 'Project', 'Tag',
        function TagsCtrl($rootScope, $scope, $state, $q, $timeout, toaster, User, Project, Tag) {
            var TG = this;
            TG.showSpinner = true;
            TG.selectedUser = null;
            TG.selectedProject = null;
            TG.selectedTags = null;
            TG.newTag = {};

            TG.users = User.getAll();
            TG.projects = Project.getAll();

            TG.selectUser = function(record) {
                TG.showSpinner = true;
                TG.selectedTags = null;
                TG.createFirstTag  =false;
                TG.users.forEach(function(rec) {
                    rec.selected = false;
                });
                record.selected = true;
                TG.selectedUser = record;
                TG.projects = Project.getAll();
                TG.projects.$promise
                    .then(function(projects) {
                        projects.forEach(function(rec) {
                            Tag.loadForProject({
                                key1: TG.selectedUser.id,
                                key2: rec.id
                            }).$promise
                                .then(function(tags) {
                                    rec.tags = tags;
                                });
                        });
                        TG.showSpinner = false;
                    })
                    .catch(function() {
                        TG.showSpinner = false;
                    });
            };

            TG.selectProject = function(record) {
                TG.selectedProject = record;
                TG.selectedTags = record.tags;
                TG.createFirstTag = !record.tags || !record.tags.length;
            };

            TG.editOn = function(record) {
                TG.selectedTags.forEach(function(rec) {
                    rec.isEdit = false;
                });
                record.isEdit = true;
            };

            TG.saveTag = function(record) {
                TG.showSpinner = true;
                Tag.update({
                    key1: record.id
                }, {
                    name: record.name
                }).$promise
                    .then(function() {
                        TG.showSpinner = false;
                        record.isEdit = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Tag succesfully updated'
                        });
                    })
                    .catch(function() {
                        TG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            TG.addTag = function() {
                TG.showSpinner = true;
                Tag.create({
                    key1: TG.selectedUser.id,
                    key2: TG.selectedProject.id
                }, {
                    name: TG.newTag.name
                }).$promise
                    .then(function() {
                        return Tag.loadForProject({
                            key1: TG.selectedUser.id,
                            key2: TG.selectedProject.id
                        }).$promise;
                    })
                    .then(function(tags) {
                        TG.selectedTags = tags;
                        TG.showSpinner = false;
                        TG.showAdd = false;
                        TG.newTag = {};
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Tag succesfully added'
                        });
                    })
                    .catch(function() {
                        TG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            TG.deleteTag = function(record) {
                TG.showSpinner = true;
                Tag.delete({
                    key1: record.id
                }).$promise
                    .then(function() {
                        return Tag.loadForProject({
                            key1: record['user_id'],
                            key2: record['project_id']
                        }).$promise;
                    })
                    .then(function(tags) {
                        TG.selectedTags = tags;
                        TG.showSpinner = false;
                        record.isEdit = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Tag succesfully updated'
                        });
                    })
                    .catch(function() {
                        TG.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            function waitForPromises() {
                $q.all([
                        TG.users.$promise,
                        TG.projects.$promise
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

        }])

    .filter('extractTags', function() {
        return function(tags) {

            var result = [];

            if (!tags || !tags.length) {
                return 'No tags';
            }

            tags.forEach(function(item) {
                result.push(item.name);
            });

            return result.join(', ');
        };
    });
