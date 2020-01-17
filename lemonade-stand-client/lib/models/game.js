"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, null, [{
        key: "screenOne",
        value: function screenOne() {

            var gameBoard = document.getElementById("GameBoard");

            gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n                <h1 class=\"title is-2 is-spaced\">\n                    Now You have advanced a screen!\n                </h1>\n                <h2 class=\"subtitle is-4\">\n                    In this small town, you are in charge of running your own lemonade stand. You can compete with as many other people as you wish, but how much profit you make is up to you. If you make the most money, you're the winner!\n                    <br><br>\n                    Are you starting a new game? \n                </h2>\n                <button onclick=\"newGame()\" class=\"button is-primary is-large\">New Game</button>";
        }
    }]);

    return Game;
}();