'use strict';

angular.module('gameLogicApp')
  .controller('MainCtrl', function ($scope, angularFire) {
    // binding these to firebase
    $scope.games = [];
    $scope.queue = {};

    var games = new Firebase("https://game-logic-tehpeh.firebaseio.com/games");
    angularFire(games, $scope, "games").then(function () {

      var queue = new Firebase("https://game-logic-tehpeh.firebaseio.com/queue");
      angularFire(queue, $scope, "queue").then(function () {
        if ($scope.queue.gameId == undefined) {
          console.log("I'm player 1");
          $scope.player = "p1";

          var newGame = {
            board: ["", "", ""],
            turn: 'p1',
            win: false,
            turnCount: 0
          };

          $scope.gameId = $scope.games.push(newGame) - 1;
          $scope
          console.log("Player 1's game is: " + $scope.gameId);

        } else {
          console.log("I'm player 2");
          $scope.player = "p2";

          $scope.gameId = $scope.queue.gameId;
          $scope.queue = {};
          console.log("Player 2's game is: " + $scope.gameId);
        }
      });

    });

    $scope.hello = function () {
      $scope.games[$scope.gameId].board[0] = "Hello!";
    };
  });
