var angular = require('angular'),
    cardDirective = require('./directives/card.directive');

var cardModule = angular.module('content-card.card', []);

cardModule.directive('contentCard', cardDirective);

module.exports = cardModule;
