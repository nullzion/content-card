var angular = require('angular');

module.exports = ['TwitchAPI', '$location', function (TwitchAPI, $location) {

    'use strict';

    var streams = [],
        channel = {
            channelName: ''
        };

    return {

        getGames: function () {
            return TwitchAPI.getGames().then(function (res) {
                return res.data.top.map(function (game) {
                    return game.game;
                });
            });
        },
        getStreams: function (gameName) {
            return TwitchAPI.getStreams(gameName).then(function (res) {
                streams = res.data.streams.map(function (stream) {
                    stream.overlayActions = {
                        remove: function () {
                            streams.splice(streams.indexOf(stream), 1);
                        },
                        favorite: function () {
                            console.info('Placeholder action for favorite button.');
                        }
                    };
                    return stream;
                });
                return streams;
            });
        },
        setGame: function (gameName) {
            $location.path(gameName);
        },
        getChannel: function () {
            return channel;
        },
        setChannel: function (channelName) {
            console.log(channelName);
            channel.channelName = channelName;
        },
        toggleMenu: function () {
            angular.element(document.getElementsByTagName('header')[0]).toggleClass('visible');
        }

    };
}];
