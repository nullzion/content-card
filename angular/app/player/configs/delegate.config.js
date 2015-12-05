module.exports = ['$sceDelegateProvider', function ($sceDelegateProvider) {

    'use strict';

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://player.twitch.tv/**'
    ]);

}];
