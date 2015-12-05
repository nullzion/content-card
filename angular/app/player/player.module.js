var angular = require('angular'),
    playerDirective = require('./directives/player.directive'),
    delegateConfig = require('./configs/delegate.config');

var playerModule = angular.module('content-card.player', []);
playerModule.directive('player', playerDirective);
playerModule.config(delegateConfig);

module.exports = playerModule;
