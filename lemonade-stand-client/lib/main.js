"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content has loaded");
});
var game = void 0;

function newGame() {
  var game = new Game();
  game.renderInstructions;
}