var angular = require('angular'),
    gamesDirective = require('./directives/games.directive');

var gamesModule = angular.module('content-card.games', ['content-card.shared']);

gamesModule.directive('games', gamesDirective);

module.exports = gamesModule;
