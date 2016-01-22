'use strict';

angular.module('tagApp')
    .controller('headerCtrl', ['$rootScope', '$scope', '$state',
        function headerCtrl($rootScope, $scope, $state) {
            var HD = this;
            HD.state = $state;

            HD.menu = [
                {
                    id: 'main',
                    title: 'Users',
                    state: 'main',
                    active: false
                },
                {
                    id: 'projects',
                    title: 'Projects',
                    state: 'projects',
                    active: false
                },
                {
                    id: 'teams',
                    title: 'Teams',
                    state: 'teams',
                    active: false
                },
                {
                    id: 'tags',
                    title: 'Tags',
                    state: 'tags',
                    active: false
                }
            ];

            // Activate current menu item
            HD.menu.forEach(function (item) {
                item.active = (item.state === $state.current.name);
            });

            // Menu click handler
            HD.onMenuClick = function (id) {
                HD.menu.forEach(function (item) {
                    item.active = false;

                    if (item.id === id) {

                        if (item.state) {
                            $state.go(item.state);
                        }
                    }
                });
            };

            // Open URL
            HD.openUrl = function(url) {
                window.open(url, '_self');
            };
        }
    ]);