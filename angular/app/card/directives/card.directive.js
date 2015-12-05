var template = require('../templates/card.template.html'),
    removeIcon = require('../../assets/remove.svg'),
    favoriteIcon = require('../../assets/fav.svg'),
    viewIcon = require('../../assets/view28.svg');

module.exports = ['Worker', function (Worker) {

    'use strict';

    return {
        restrict: 'AE',
        scope: {
            stream: '='
        },
        template: template,
        link: function ($scope, element, attrs) {

            $scope.assets = {
                remove: removeIcon,
                favorite: favoriteIcon,
                view: viewIcon
            };

            $scope.$watch('stream', function () {
                if ($scope.stream) {
                    element.css('opacity', 1);
                }
            });

            $scope.callWorkerAction = function (actionName, data) {
                if (typeof Worker[actionName] === 'function') {
                    Worker[actionName](data);
                }
            };

        }
    };

}];
