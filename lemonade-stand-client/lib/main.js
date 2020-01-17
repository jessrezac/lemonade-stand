"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content has loaded");
});

function newGame() {
  var game1 = new Game();
  Game.screenOne();
}