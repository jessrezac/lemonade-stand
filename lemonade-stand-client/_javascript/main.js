document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded");
  let url = "http://localhost:3000/games";
  fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data));
});

function newGame() {
  let url = "http://localhost:3000/games"
  let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
  fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data));

}
