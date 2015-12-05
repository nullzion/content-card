module.exports = [function () {

    'use strict';

    return {
        restrict: 'E',
        scope: {
            channel: '='
        },
        template: '<iframe ng-src="{{genereateChannelURL(channel.channelName)}}"></iframe>',
        link: function ($scope, element, attrs) {

            $scope.genereateChannelURL = function (channel) {
                return 'http://player.twitch.tv/?channel=' + channel;
            }

            $scope.$watch(function () {
                return $scope.channel.channelName;
            }, function () {
                if ($scope.channel.channelName !== '') {
                    element.parent().css('display', 'block');
                }
            });

        }
    }
}];
