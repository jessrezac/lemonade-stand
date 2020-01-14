document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded");
  let url = "http://localhost:3000/games";
  fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data));
});
