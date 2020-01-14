"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content has loaded");
  var url = "http://localhost:3000/games";
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return console.log(data);
  });
});