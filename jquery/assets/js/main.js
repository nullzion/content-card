(function ($, _, Modernizr, window) {

    'use strict';

    /**
     * Simple wrapper around Twitch API
     * @type {Object}
     */
    var TwitchAPI = {
        baseURI: 'https://api.twitch.tv/kraken',
        getEndpoint: function (endpoint) {
            return $.get(this.baseURI + endpoint);
        }
    };

    /**
     * Underscore's compiled template
     * @type {Function}
     */
    var template = _.template($('#twitch-card').html());

    /**
     * Our application module
     * @param  {Function} $ jQuery dependency
     * @param  {Object} TwitchAPI TwitchAPI dependency
     * @return {Object} Instance of our application
     */
    var TwitchSPA = (function ($, TwitchAPI) {

        var twitchSPA = {

            /**
             * Element that holds games menu
             * @type {Object}
             */
            gamesContainer: $('header .games'),

            /**
             * Element that holds streams supplied by API
             * @type {Object}
             */
            streamsContainer: $('section.streams'),

            /**
             * Since this whole project is based around ContentCard plugin, store selector
             * @type {String}
             */
            contentCardSelector: '.content-card',

            /**
             * Header container
             * @type {Object}
             */
            headerMenu: $('header'),

            /**
             * Button responsible for opening responsive menu
             * @type {Object}
             */
            openMenuBtn: $('.open-btn'),

            /**
             * Fetch top games from Twitch API. Request should return current 10 most popular games.
             * Once request is done, parse date and feed it to appropriate method.
             */
            fetchTopGames: function () {

                var self = this;

                TwitchAPI.getEndpoint('/games/top').then(function (res) {

                    res.top.forEach(function (item) {
                        self.appendGame(item.game);
                    });

                }, this.handleAjaxError);
            },

            /**
             * Accepts game name and fetches streams for given game name, if no game name is supplied
             * will fetch most popular streams
             * @param  {String} gameName Title of the game we want fetch streams for
             */
            fetchStreams: function (gameName) {

                var self = this;

                this.destoryCardInstances();

                if (gameName) {

                    TwitchAPI.getEndpoint('/streams?game=' + gameName).then(function (res) {
                        res.streams.forEach(function (stream) {
                            self.appendStream(stream);
                        });
                        self.intializeCardInstances();
                    }, this.handleAjaxError);

                } else {

                    TwitchAPI.getEndpoint('/streams').then(function (res) {
                        res.streams.forEach(function (stream) {
                            self.appendStream(stream);
                        });
                        self.intializeCardInstances();
                    }, this.handleAjaxError);

                }
            },

            /**
             * Accepts single game object from Twitch API and builds element holding data.
             * Appends element to appropriate holder element
             * @param  {object} Object represeting game as returned by Twitch API
             */
            appendGame: function (game) {
                var gameElement = $([
                    '<li>',
                    '<a href="#/' + game.name + '">',
                    '<img src="' + game.box.medium + '">',
                    '</a>',
                    '</li>'
                ].join(''));
                this.gamesContainer.append(gameElement);
            },

            /**
             * Accepts single stream object and builds element holding data.
             * Appends element to appropriate holder element.
             * @param  {Object} Object represeting stream as returned by Twitch API
             */
            appendStream: function (stream) {
                var streamElement = $('<article/>')
                    .addClass('content-card')
                    .data({
                        title: stream.channel.display_name,
                        subtitle: stream.channel.status,
                        backgroundImage: stream.preview.large,
                        icon: stream.channel.logo,
                        url: stream.channel.url,
                        channel: stream.channel.name
                    });
                this.streamsContainer.append(streamElement);
            },

            /**
             * Global AJAX error handler, should be turned into something fancy
             *
             * @todo  Make unified visual error reporting
             * @param  {jqXHR} Connection object
             * @param  {String} Error status
             * @param  {String} Actual error
             */
            handleAjaxError: function (request, status, error) {
                console.error(status, error);
            },

            /**
             * Method that handles hash changes, triggers appropriate method to fetch streams based on parsed hash
             *
             * @param  {Event} Event as set by browser
             */
            handleHashChange: function (e) {

                var gameHash = window.location.hash.match('^\#\/(.+)$');
                if (gameHash && gameHash.length === 2) {
                    this.fetchStreams(decodeURIComponent(gameHash[1]));
                } else {
                    this.fetchStreams();
                }
                this.toggleMenu();

            },

            /**
             * Once data is provided, initialize our plugin on given elements
             */
            intializeCardInstances: function () {
                $(this.contentCardSelector).contentCard({
                    template: template,
                    actions: {
                        remove: function (e, element) {

                            if (Modernizr.touch && !$(element).hasClass('visible-actions') && window.innerWidth < 1024) {
                                return;
                            }

                            $(element).remove();
                        },
                        view: function (e, element) {
                            var videoContainer = $('#video-container .video-wrapper'),
                                stream = $('<iframe/>').attr('src', 'http://player.twitch.tv/?channel=' + $(element).data('channel'));

                            if (Modernizr.touch && !$(element).hasClass('visible-actions') && window.innerWidth < 1024) {
                                return;
                            }

                            videoContainer.css('display', 'block').html('').append(stream);
                            $('html, body').animate({scrollTop: 0}, 500);
                        },
                        toggle: function (e, element) {
                            if (Modernizr.touch && !$(element).hasClass('visible-actions') && window.innerWidth < 1024) {
                                $(element).addClass('visible-actions');
                            }
                        }
                    },
                    onRender: function (element) {
                        setTimeout(function () {
                            $(element).css('opacity', 1);
                        }, 0);
                    }
                });
            },

            /**
             * Destroy instances of ContentCard plugin, this also removes them from page
             */
            destoryCardInstances: function () {
                $(this.contentCardSelector).contentCard('remove');
            },

            /**
             * Toggles responsive menu
             */
            toggleMenu: function () {
                this.headerMenu.toggleClass('visible');
            },

            /**
             * Initialize our application
             */
            intialize: function () {

                this.fetchTopGames();
                $(window).on('hashchange', this.handleHashChange.bind(this));
                this.headerMenu.find('.close-btn').on('click', this.toggleMenu.bind(this));
                this.openMenuBtn.on('click', this.toggleMenu.bind(this));
                this.handleHashChange();

            }
        };

        twitchSPA.intialize();

        return twitchSPA;

    }($, TwitchAPI));


}(jQuery, _, Modernizr, window));
