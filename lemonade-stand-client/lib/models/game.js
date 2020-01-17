"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.gameBoard = document.getElementById("GameBoard");
        this.addExitListener();
    }

    _createClass(Game, [{
        key: "addExitListener",
        value: function addExitListener() {
            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 27) {
                    // TODO: Create game exit
                    console.log("you quit!");
                }
            });
        }
    }, {
        key: "renderInstructions",
        get: function get() {
            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"subtitle is-4\">\n                To manage your lemonade stand, you will need to make these decisions every day:\n            </p>\n            \n            <p><ol class=\"subtitle is-4\">\n                <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>\n                <li>How many advertising signs to make (the signs cost fifteen cents each)</li>\n                <li>What price to charge for each glass</li>\n            </ol></p>\n\n            <p class=\"subtitle is-4\">\n                You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.\n            </p>\n\n            <p class=\"subtitle is-4\">\n                Your expenses are the sum of the cost of the lemonade and the cost of the signs.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Your profits are the difference between the income from sales and your expenses.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                The number of glasses you sell each day depends on the price you charge, and on the number of advertising signs you use.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Keep track of your assets, because you can't spend more money than you have!\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 32) {
                    var day = new Day();
                }
            });
        }
    }]);

    return Game;
}();