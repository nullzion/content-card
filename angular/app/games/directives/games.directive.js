var template = require('../templates/games.template.html'),
    closeBtn = require('../../assets/remove.svg');

module.exports = ['Worker', function (Worker) {

    'use strict';

    return {
        restrict: 'A',
        scope: {
            games: '='
        },
        template: template,
        link: function ($scope, element, attrs) {

            $scope.setGame = function (gameName) {
                Worker.setGame(gameName);
            };

            $scope.assets = {
                close: closeBtn
            };

            $scope.toggleMenu = function () {
                Worker.toggleMenu();
            };

        }
    };
}];
