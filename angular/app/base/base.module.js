var angular = require('angular'),
    rootController = require('./controllers/root.controller');

/**
 * Base Module
 * @type {Object}
 */
var baseModule = angular.module('content-card.base', ['content-card.shared', 'content-card.games', 'content-card.card', 'content-card.player']);

/**
 * Register RootController
 */
baseModule.controller('RootController', rootController);

module.exports = baseModule;
