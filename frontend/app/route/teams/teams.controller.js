'use strict';

angular.module('tagApp').controller('TeamsCtrl',
    ['$rootScope', '$scope', '$state', '$q', '$timeout', 'toaster', 'User', 'Project', 'Team', 'Member',
        function TeamsCtrl($rootScope, $scope, $state, $q, $timeout, toaster, User, Project, Team, Member) {
            var TM = this;
            TM.showSpinner = true;
            TM.selectedProject = null;
            TM.showAdd = false;
            TM.currentTeam = null;
            TM.newMember = null;

            TM.projects = Project.getAll();
            TM.users = User.getAll();

            TM.selectProject = function(record) {
                TM.projects.forEach(function(rec) {
                    rec.selected = false;
                });
                record.selected = true;
                TM.selectedProject = record;
                TM.loadTeam(record);
            };

            TM.loadTeam = function(project) {
                TM.showSpinner = true;
                TM.currentTeam = null;
                TM.newMember = null;
                TM.team = Team.loadForProject({
                    key2: project.id
                });
                TM.team.$promise
                    .then(function() {
                        return Team.get({
                            key2: project.id
                        }).$promise;
                    })
                    .then(function(team) {
                        TM.currentTeam = team;
                        TM.showSpinner = false;
                    })
                    .catch(function(err) {
                        TM.showSpinner = false;
                    });
            };

            TM.getMemberName = function(id) {
                var name = 'Unknown';
                TM.users.forEach(function(item) {

                    if (item.id === id) {
                        name = item.full_name;
                    }
                });
                return name;
            };

            TM.addMember = function() {
                TM.showSpinner = true;

                if (!TM.currentTeam || !TM.currentTeam.id) {
                    Team.create({
                        key1: TM.selectedProject.id
                    }, {
                        name: 'Team for project: '+ TM.selectedProject.name
                    }).$promise
                        .then(function() {
                            return Team.get({
                                key2: TM.selectedProject.id
                            }).$promise;
                        })
                        .then(function(team) {
                            TM.currentTeam = team;
                            TM.showSpinner = false;
                            TM.addMember();
                        })
                        .catch();
                    return;
                }

                Member.create({
                    key1: TM.currentTeam.id,
                    key2: TM.newMember
                }).$promise
                    .then(function() {
                        TM.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'new member successfully added'
                        });
                        TM.showAdd = false;
                        TM.newMember = null;
                        TM.loadTeam(TM.selectedProject);
                    })
                    .catch(function() {
                        TM.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            TM.deleteMember = function(record) {
                TM.showSpinner = true;

                Member.delete({
                    key1: record.id
                }).$promise
                    .then(function() {
                        TM.showSpinner = false;
                        toaster.pop({
                            type: 'info',
                            title: 'Success',
                            body: 'Member successfully removed from team'
                        });
                        TM.loadTeam(TM.selectedProject);
                    })
                    .catch(function() {
                        TM.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            };

            function waitForPromises() {
                $q.all([
                        TM.projects.$promise,
                        TM.users.$promise
                    ])
                    .then(function() {
                        TM.showSpinner = false;
                    })
                    .catch(function(err) {
                        TM.showSpinner = false;
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'Error occurred'
                        });
                    });
            }

            waitForPromises();

        }]);
