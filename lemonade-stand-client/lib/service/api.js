"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
  function Api() {
    _classCallCheck(this, Api);

    this.baseURL = "http://localhost:3000";
  }

  _createClass(Api, null, [{
    key: "submitNewGame",
    value: function submitNewGame(formData) {
      event.preventDefault();

      var configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch(Api.baseUrl + "/api/v1/games", configObj).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        return console.log(data);
      });
    }
  }, {
    key: "submitNewDay",
    value: function submitNewDay(formData) {
      event.preventDefault();

      var configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch(Api.baseUrl + "/api/v1/games", configObj).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        return console.log(data);
      });
    }
  }, {
    key: "deleteGame",
    value: function deleteGame(formData) {
      event.preventDefault();

      var configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch(Api.baseUrl + "/api/v1/games", configObj).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        return console.log(data);
      });
    }
  }]);

  return Api;
}();