module.exports = ['$http', function ($http) {

    'use strict';

    var baseURI = 'https://api.twitch.tv/kraken';

    return {
        /**
         * Fetch top games from Twitch API
         * @return {Promise} Request promise
         */
        getGames: function () {
            return $http.get(baseURI + '/games/top');
        },
        /**
         * Fetch streams for given game name, or top streams if no game name is present
         * @param  {String} gameName Name of request game
         * @return {Promise}          Request promise
         */
        getStreams: function (gameName) {
            if (gameName) {
                return $http.get(baseURI + '/streams', {
                    params: {
                        game: gameName
                    }
                });
            } else {
                return $http.get(baseURI + '/streams');
            }
        }
    };

}]
