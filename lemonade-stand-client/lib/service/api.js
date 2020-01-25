"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);
    }

    _createClass(Api, null, [{
        key: "baseUrl",
        value: function baseUrl() {
            return "http://localhost:3000/api/v1";
        }
    }, {
        key: "submitNewGame",
        value: function submitNewGame(formData, game) {
            console.log("Submitting new game from " + Api.baseUrl());
            var configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            };

            fetch(Api.baseUrl() + "/games", configObj).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                return game.applyResults(data);
            });
        }
    }, {
        key: "submitNewDay",
        value: function submitNewDay(formData, game) {
            console.log("Submitting new day from " + Api.baseUrl());

            var configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            };

            fetch(Api.baseUrl() + ("/games/" + game.gameId), configObj).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                return game.applyResults(data);
            });
        }
    }, {
        key: "deleteGame",
        value: function deleteGame(gameId) {
            var configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({}) };

            fetch(Api.baseUrl() + ("/games/" + gameId), configObj).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                window.location.reload();
            });
        }
    }]);

    return Api;
}();