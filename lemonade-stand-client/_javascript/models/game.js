class Game {
    constructor(){
        this.gameBoard = document.getElementById("GameBoard");
    } 

    get screenOne() {
        this.gameBoard.innerHTML = `<img src="images/favicon/android-chrome-192x192.png" alt="lemon emoji"><br><br>
                <p class="subtitle is-4">
                    To manage your lemonade stand, you will need to make these decisions every day:
                </p>
                
                <p><ol class="subtitle is-4">
                    <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>
                    <li>How many advertising signs to make (the signs cost fifteen cents each)</li>
                    <li>What price to charge for each glass</li>
                </ol></p>

                <p class="subtitle is-4">
                    You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.
                </p>

                <p class="subtitle is-4">
                    Your expenses are the sum of the cost of the lemonade and the cost of the signs.
                </p>
                
                <p class="subtitle is-4">
                    Your profits are the difference between the income from sales and your expenses.
                </p>
                
                <p class="subtitle is-4">
                    The number of glasses you sell each day depends on the price you charge, and on the number of advertising signs you use.
                </p>
                
                <p class="subtitle is-4">
                    Keep track of your assets, because you can't spend more money than you have!
                </p>
                
                <p class="subtitle is-4">
                    Press space to continue, esc to end...
                </p>`;

        document.addEventListener("keyup", e => {
            if(e.keyCode == 32) {
                this.screenTwo;
            } else if (e.keyCode == 27) {
                console.log("You quit already?");
            }
        })
    }

    get screenTwo() {
        this.gameBoard.innerHTML = `<p class="title is-3 is-spaced">
                    Lemonsville Weather Report
                </p>
                <p class="title is-3">
                    Cloudy
                </p>
                <img src="images/lemonadestand.png" alt="lemonade stand">`
        
        document.addEventListener("keyup", e => {
            if (e.keyCode == 32) {
            this.screenThree;
            } else if (e.keyCode == 27) {
            console.log("You quit already?");
            }
        });
    }
}
