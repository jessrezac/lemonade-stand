"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.gameBoard = document.getElementById("GameBoard");
        this.gameId = null;
        this.addExitListener();
    }

    _createClass(Game, [{
        key: "playDay",
        value: function playDay() {
            var game = this;

            //TODO: Talk to Michael about conventions around this.
            setTimeout(function () {
                game.renderForm(game.day);
            }, 3000);

            this.gameBoard.innerHTML = "<p class=\"title is-3 is-spaced has-text-centered\">\n                Lemonsville Weather Report\n            </p>\n            <p class=\"title is-3 has-text-centered\">\n                " + this.day.renderWeather + "\n            </p>\n            <img src=\"images/lemonadestand.png\" alt=\"lemonade stand graphic with two glasses and a pitcher of lemonade\">";
        }
    }, {
        key: "renderForm",
        value: function renderForm() {
            var _this = this;

            this.gameBoard.innerHTML = this.day.renderDay;
            var dayForm = document.getElementById("dayForm");
            dayForm.addEventListener("submit", function (e) {
                event.preventDefault();
                _this.submitDay(e.target);
            });
        }
    }, {
        key: "submitDay",
        value: function submitDay(dayData) {
            var formData = {
                "game": {
                    "game_id": this.gameId
                },
                "day": {
                    "number": this.day.number,
                    "cost_of_lemonade": this.day.costOfLemonade,
                    "glasses_made": dayData.glasses.value, // form
                    "cost_of_signs": this.day.costOfSigns,
                    "signs_made": dayData.signs.value, // form
                    "charge_per_glass": dayData.charge.value, //form
                    "weather": this.day.weather
                }
            };
            console.log(formData);
            if (formData.day.number === 1) {
                Api.submitNewGame(formData);
            } else {
                Api.submitNewDay(formData);
            }
        }
    }, {
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
            var _this2 = this;

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"subtitle is-4\">\n                To manage your lemonade stand, you will need to make these decisions every day:\n            </p>\n            \n            <p><ol class=\"subtitle is-4\">\n                <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>\n                <li>How many advertising signs to make (the signs cost fifteen cents each)</li>\n                <li>What price to charge for each glass</li>\n            </ol></p>\n\n            <p class=\"subtitle is-4\">\n                You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.\n            </p>\n\n            <p class=\"subtitle is-4\">\n                Your expenses are the sum of the cost of the lemonade and the cost of the signs.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Your profits are the difference between the income from sales and your expenses.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                The number of glasses you sell each day depends on the price you charge, and on the number of advertising signs you use.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Keep track of your assets, because you can't spend more money than you have!\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 32) {
                    _this2.day = new Day();
                    _this2.playDay();
                }
            });
        }
    }]);

    return Game;
}();