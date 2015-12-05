var angular = require('angular'),
    workerFactory = require('./services/worker.service');

var sharedModule = angular.module('content-card.shared',  ['content-card.api']);

sharedModule.factory('Worker', workerFactory);

module.exports = sharedModule;
