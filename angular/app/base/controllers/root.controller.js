module.exports = ['$scope', '$location', 'Worker', function ($scope, $location, Worker) {

    'use strict';

    /**
     * Bind games object to scope after request is done
     */
    Worker.getGames().then(function (games) {
        $scope.games = games;
    });

    /**
     * Bind streams object to scope after request is done
     */
    Worker.getStreams().then(function (streams) {
        $scope.streams = streams;
    });

    /**
     * Bind channel object to scope
     * @type {Object}
     */
    $scope.channel = Worker.getChannel();

    /**
     * Watch location for changes, after event request streams for game name fetched from location
     */
    $scope.$watch(function () {
        return $location.path();
    }, function () {
        Worker.getStreams($location.path().replace('/', '')).then(function (streams) {
            $scope.streams = streams;
        });
    });

    $scope.toggleMenu = function () {
        Worker.toggleMenu();
    };

}];
