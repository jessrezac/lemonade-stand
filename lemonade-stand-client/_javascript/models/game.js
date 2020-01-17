class Game {
    static screenOne() {
        
        let gameBoard = document.getElementById("GameBoard");

        gameBoard.innerHTML = `<img src="images/favicon/android-chrome-192x192.png" alt="lemon emoji"><br><br>
                <h1 class="title is-2 is-spaced">
                    Now You have advanced a screen!
                </h1>
                <h2 class="subtitle is-4">
                    In this small town, you are in charge of running your own lemonade stand. You can compete with as many other people as you wish, but how much profit you make is up to you. If you make the most money, you're the winner!
                    <br><br>
                    Are you starting a new game? 
                </h2>
                <button onclick="newGame()" class="button is-primary is-large">New Game</button>`;
    }
}
