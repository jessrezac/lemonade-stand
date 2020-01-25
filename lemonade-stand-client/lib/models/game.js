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
                    "id": this.gameId
                },
                "days_attributes": {
                    "number": this.day.number,
                    "cost_of_lemonade": this.day.costOfLemonade,
                    "glasses_made": dayData.glasses.value, // form
                    "cost_of_signs": this.day.costOfSigns,
                    "signs_made": dayData.signs.value, // form
                    "charge_per_glass": dayData.charge.value, //form
                    "weather": this.day.weather
                }
            };
            if (formData.days_attributes.number === 1) {
                Api.submitNewGame(formData, this);
            } else {
                Api.submitNewDay(formData, this);
            }
        }
    }, {
        key: "applyResults",
        value: function applyResults(results) {
            this.gameId = results.data.id;
            var attributes = results.data.attributes;
            this.currentAssets = attributes.current_assets;
            var days = results.data.attributes.days;
            var dayAttributes = days[days.length - 1];
            this.day.glassesMade = dayAttributes.glasses_made;
            this.day.chargePerGlass = dayAttributes.charge_per_glass;
            this.day.signsMade = dayAttributes.signs_made;
            this.day.glassesSold = dayAttributes.glasses_sold;
            this.day.profits = dayAttributes.profits;

            this.renderResults();
        }
    }, {
        key: "renderResults",
        value: function renderResults() {
            var _this2 = this;

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"title is-2\">\n                Day " + this.day.number + "\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                " + this.day.glassesSold + " glasses sold    \n            </p>\n            \n            <p class=\"subtitle is-4\">\n                $0." + this.day.chargePerGlass + " per glass    \n            </p>\n            \n            <p class=\"subtitle is-4 has-text-right\">\n                Income $" + this.day.glassesSold * this.day.chargePerGlass * .01 + "    \n            </p>\n            \n            <p class=\"subtitle is-4\">\n                " + this.day.glassesMade + " glasses made    \n            </p>\n            \n            <p class=\"subtitle is-4\">\n                " + this.day.signsMade + " signs made    \n            </p>\n            \n            <p class=\"subtitle is-4 has-text-right\">\n                Expenses $." + (this.day.glassesMade * this.day.costOfLemonade + this.day.signsMade * this.day.costOfSigns) + "  \n            </p>\n            \n            <p class=\"subtitle is-4 has-text-centered\">\n                Profit $" + this.day.profits + "    \n            </p>\n            \n            <p class=\"subtitle is-4 has-text-centered\">\n                Assets $" + this.currentAssets + "    \n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 32) {
                    _this2.day = new Day(_this2.currentAssets, ++_this2.day.number);
                    _this2.playDay();
                }
            });
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
            var _this3 = this;

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"subtitle is-4\">\n                To manage your lemonade stand, you will need to make these decisions every day:\n            </p>\n            \n            <p><ol class=\"subtitle is-4\">\n                <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>\n                <li>How many advertising signs to make (the signs cost fifteen cents each)</li>\n                <li>What price to charge for each glass</li>\n            </ol></p>\n\n            <p class=\"subtitle is-4\">\n                You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.\n            </p>\n\n            <p class=\"subtitle is-4\">\n                Your expenses are the sum of the cost of the lemonade and the cost of the signs.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Your profits are the difference between the income from sales and your expenses.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                The number of glasses you sell each day depends on the price you charge, and on the number of advertising signs you use.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Keep track of your assets, because you can't spend more money than you have!\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 32) {
                    _this3.day = new Day();
                    _this3.playDay();
                }
            });
        }
    }]);

    return Game;
}();