var angular = require('angular'),
    twitchFactory = require('./services/twitch.service');

/**
 * API Module
 * @type {Object}
 */
var apiModule = angular.module('content-card.api', []);

/**
 * Register Twitch API factory
 */
apiModule.factory('TwitchAPI', twitchFactory);

module.exports = apiModule;
