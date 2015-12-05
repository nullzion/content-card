var angular = require('angular');

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./style/style.css');

require('./api/api.module');
require('./shared/shared.module');
require('./games/games.module');
require('./card/card.module');
require('./player/player.module');
require('./base/base.module');

var contentCardModule = angular.module('content-card', ['content-card.base']);

module.exports = contentCardModule;
