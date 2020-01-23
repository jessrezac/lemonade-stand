class Game {
    constructor(){
        this.gameBoard = document.getElementById("GameBoard");
        this.gameId = null
        this.addExitListener()
    } 

    get renderInstructions() {
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
            if (e.keyCode == 32) {
                this.day = new Day;
                this.playDay()
            }
        });
    }

    playDay() {
        let game = this

        //TODO: Talk to Michael about conventions around this.
        setTimeout(function() {
            game.renderForm(game.day);
        }, 3000)
        
        this.gameBoard.innerHTML = `<p class="title is-3 is-spaced has-text-centered">
                Lemonsville Weather Report
            </p>
            <p class="title is-3 has-text-centered">
                ${this.day.renderWeather}
            </p>
            <img src="images/lemonadestand.png" alt="lemonade stand graphic with two glasses and a pitcher of lemonade">`            
    }

    renderForm() {
        this.gameBoard.innerHTML = this.day.renderDay
        let dayForm = document.getElementById("dayForm")
        dayForm.addEventListener("submit", e => {
            event.preventDefault();
            this.submitDay(e.target);
        });  
    }

    submitDay(dayData) {
        let formData = {
            "game": { 
                "id": this.gameId
            },
            "days_attributes": {
                "number": this.day.number,
                "cost_of_lemonade": this.day.costOfLemonade,
                "glasses_made": dayData.glasses.value, // form
                "cost_of_signs": this.day.costOfSigns,
                "signs_made": dayData.signs.value, // form
                "charge_per_glass": dayData.charge.value, //form
                "weather": this.day.weather
            }
        };
        console.log(formData)
        if (formData.days_attributes.number === 1) {
            Api.submitNewGame(formData)
        } else {
            Api.submitNewDay(formData)
        }
        
    }

    addExitListener() {
        document.addEventListener("keyup", e => {
            if (e.keyCode == 27) {
                // TODO: Create game exit
                console.log("you quit!")
            }
        })
    }
}