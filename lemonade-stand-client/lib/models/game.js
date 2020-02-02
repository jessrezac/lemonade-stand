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
                game.renderForm();
            }, 3000);

            this.gameBoard.innerHTML = "<p class=\"title is-3 is-spaced has-text-centered\">\n                Lemonsville Weather Report\n            </p>\n            <p class=\"title is-3 has-text-centered\">\n                " + this.day.renderWeather + "\n            </p>\n            <figure class=\"image is-5by4\">\n                <img src=\"images/lemonadestand.png\" class=\"is-max-height-60\" alt=\"lemonade stand graphic with two glasses and a pitcher of lemonade\">            \n            </figure>";
        }
    }, {
        key: "renderForm",
        value: function renderForm() {
            var _this = this;

            this.gameBoard.innerHTML = this.day.renderDay;
            var dayForm = document.getElementById("dayForm");
            dayForm.addEventListener("submit", function (e) {
                event.preventDefault();
                if (_this.validateForm(e.target)) {
                    _this.submitDay(e.target);
                }
            });
        }
    }, {
        key: "validateForm",
        value: function validateForm(dayData) {
            var glassesHelp = document.getElementById("glassesHelp");
            var signsHelp = document.getElementById("signsHelp");
            var chargeHelp = document.getElementById("chargeHelp");

            glassesHelp.innerText = "";
            signsHelp.innerText = "";
            chargeHelp.innerText = "";

            var invalidations = 0;

            if (dayData.glasses.value < 0 || dayData.glasses.value >= 1000) {
                glassesHelp.innerText = "Come on, let's be reasonable now! Try again.";
                invalidations++;
            }

            if (dayData.glasses.value * this.day.costOfLemonade * 0.01 > this.currentAssets) {
                glassesHelp.innerText = "Think again! You don't have enough cash";
                invalidations++;
            }

            if (dayData.signs.value < 0 || dayData.signs.value > 50) {
                signsHelp.innerText = "Come on, let's be reasonable now! Try again.";
                invalidations++;
            }

            if (dayData.signs.value * this.day.costOfSigns * 0.01 + (dayData.glasses.value + this.day.costOfLemonade * 0.01) > this.currentAssets) {
                signsHelp.innerText = "Think again! You don't have enough cash.";
                invalidations++;
            }

            if (dayData.charge.value < 0 || dayData.charge.value > 100) {
                chargeHelp.innerText = "Come on, let's be reasonable now! Try again.";
                invalidations++;
            }

            if (invalidations === 0) {
                return true;
            }
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

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n\n            <p class=\"title is-2\">\n                Day " + this.day.number + "\n            </p>\n\n            <p class=\"subtitle is-4\">\n                " + this.day.glassesSold + " glasses sold\n            </p>\n\n            <p class=\"subtitle is-4\">\n                $" + parseFloat(this.day.chargePerGlass * 0.01).toFixed(2) + " charge per glass\n            </p>\n\n            <p class=\"subtitle is-3 has-text-right\">\n                Income: $" + parseFloat(this.day.glassesSold * this.day.chargePerGlass * 0.01).toFixed(2) + "\n            </p>\n\n            <p class=\"subtitle is-4\">\n                " + this.day.glassesMade + " glasses made\n            </p>\n\n            <p class=\"subtitle is-4\">\n                " + this.day.signsMade + " signs made\n            </p>\n\n            <p class=\"subtitle is-3 has-text-right\">\n                Expenses: $" + parseFloat((this.day.glassesMade * this.day.costOfLemonade + this.day.signsMade * this.day.costOfSigns) * 0.01).toFixed(2) + "\n            </p>\n\n            <p class=\"title is-4 has-text-centered\">\n                Profit $" + parseFloat(this.day.profits).toFixed(2) + "    \n            </p>\n            \n            <p class=\"title is-4 has-text-centered\">\n                Assets $" + parseFloat(this.currentAssets).toFixed(2) + "    \n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            var waitToCreateNextDay = function waitToCreateNextDay(e) {
                if (e.keyCode == 32) {
                    _this2.day = new Day(_this2.currentAssets, ++_this2.day.number);
                    _this2.playDay();
                    document.removeEventListener("keyup", waitToCreateNextDay);
                }
            };

            document.addEventListener("keyup", waitToCreateNextDay);
        }
    }, {
        key: "addExitListener",
        value: function addExitListener() {
            var _this3 = this;

            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 27) {
                    // TODO: Create game exit
                    var modal = document.getElementById("alert");
                    modal.classList.add("is-active");
                    document.addEventListener("click", function (e) {
                        modal.classList.remove("is-active");
                    });
                    document.addEventListener("keyup", function (e) {
                        if (e.keyCode == 13) {
                            if (_this3.gameId) {
                                Api.deleteGame(_this3.gameId);
                            } else {
                                window.location.reload();
                            }
                        } else if (e.keyCode == 32) {
                            modal.classList.remove("is-active");
                        }
                    });
                }
            });
        }
    }, {
        key: "renderInstructions",
        get: function get() {
            var _this4 = this;

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"subtitle is-4\">\n                To manage your lemonade stand, you will need to make these decisions every day:\n            </p>\n            \n            <div class=\"content\"><ol class=\"subtitle is-4\">\n                <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>\n                <li>How many advertising signs to make (the signs cost fifteen cents each)</li>\n                <li>What price to charge for each glass</li>\n            </ol></div>\n\n            <p class=\"subtitle is-4\">\n                You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            var waitToRenderMore = function waitToRenderMore(e) {
                if (e.keyCode == 32) {
                    _this4.renderMoreInstructions;
                    document.removeEventListener("keyup", waitToRenderMore);
                }
            };

            document.addEventListener("keyup", waitToRenderMore);
        }
    }, {
        key: "renderMoreInstructions",
        get: function get() {
            var _this5 = this;

            this.gameBoard.innerHTML = "<img src=\"images/favicon/android-chrome-192x192.png\" alt=\"lemon emoji\"><br><br>\n            <p class=\"subtitle is-4\">\n                Your expenses are the sum of the cost of the lemonade and the cost of the signs.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Your profits are the difference between the income from sales and your expenses.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                The number of glasses you sell each day depends on the price you charge, and on the number of advertising signs you use.\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Keep track of your assets, because you can't spend more money than you have!\n            </p>\n            \n            <p class=\"subtitle is-4\">\n                Press space to continue, esc to end...\n            </p>";

            var waitToCreateDayOne = function waitToCreateDayOne(e) {
                if (e.keyCode == 32) {
                    _this5.day = new Day();
                    _this5.playDay();
                    document.removeEventListener("keyup", waitToCreateDayOne);
                }
            };

            document.addEventListener("keyup", waitToCreateDayOne);
        }
    }]);

    return Game;
}();