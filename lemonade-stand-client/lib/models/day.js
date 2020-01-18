"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Day = function () {
    function Day() {
        var assets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2.00;
        var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        _classCallCheck(this, Day);

        this.assets = assets;
        this.number = number;
        this.costOfSigns = 15;
        this.setCostOfLemonade();
        this.generateWeather();
    }

    _createClass(Day, [{
        key: "setCostOfLemonade",
        value: function setCostOfLemonade() {
            if (this.number > 6) {
                this.costOfLemonade = 5;
            } else if (this.number > 2) {
                this.costOfLemonade = 4;
            } else {
                this.costOfLemonade = 2;
            }
        }
    }, {
        key: "generateWeather",
        value: function generateWeather() {
            this.weather = Math.floor(Math.random() * 4);
        }
    }, {
        key: "renderWeather",
        get: function get() {
            switch (this.weather) {
                case 0:
                    return "Thunderstorms";
                    break;
                case 1:
                    return "Cloudy";
                    break;
                case 2:
                    return "Sunny";
                    break;
                case 3:
                    return "Hot and Sunny";
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "renderDay",
        get: function get() {

            return "<p class=\"title is-2\">On Day " + this.number + ", the cost of lemonade is $0.0" + this.costOfLemonade + ".</p>\n        <p class=\"subtitle is-4\">Assets $" + this.assets.toFixed(2) + "</p>\n        \n        <form class=\"form\" id=\"dayForm\">\n            <div class=\"field\">\n                <label for=\"glasses\" class=\"label\">How many glasses of lemonade do you wish to make?</label>\n                <div class=\"control\">\n                    <input class=\"input\" type=\"number\" placeholder=\"Number of Glasses\" name=\"glasses\">\n                </div>\n            </div>\n            <div class=\"field\">\n                <label for=\"signs\" class=\"label\">How many advertising signs (15 cents each) do you want to make?</label>\n                <div class=\"control\">\n                    <input class=\"input\" type=\"number\" placeholder=\"Number of Signs\" name=\"signs\">\n                </div>\n            </div>\n            <div class=\"field\">\n                <label for=\"charge\" class=\"label\">What price (in cents) do you wish to charge for lemonade?</label>\n                <div class=\"control\">\n                    <input class=\"input\" type=\"number\" placeholder=\"Charge for Lemonade\" name=\"charge\">\n                </div>\n            </div>\n            <input id=\"submit-day-btn\" class=\"button is-primary is-large\" type=\"submit\" value=\"Submit\">\n        </form>";
        }
    }]);

    return Day;
}();