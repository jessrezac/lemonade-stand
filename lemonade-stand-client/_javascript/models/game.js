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
            
            <div class="content"><ol class="subtitle is-4">
                <li>How many glasses of lemonade to make (only one batch is made in the morning)</li>
                <li>How many advertising signs to make (the signs cost fifteen cents each)</li>
                <li>What price to charge for each glass</li>
            </ol></div>

            <p class="subtitle is-4">
                You will begin with $2.00 cash (assets). Because your mother gave you some sugar, your cost to make lemonade is two cents a glass. This may change in the future.
            </p>
            
            <p class="subtitle is-4">
                Press space to continue, esc to end...
            </p>`

            let waitToRenderMore = e => {
                if (e.keyCode == 32) {
                    this.renderMoreInstructions;
                    document.removeEventListener("keyup", waitToRenderMore);
                }
            }
            
            document.addEventListener("keyup", waitToRenderMore);

    }

    get renderMoreInstructions() {
        this.gameBoard.innerHTML = `<img src="images/favicon/android-chrome-192x192.png" alt="lemon emoji"><br><br>
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

        let waitToCreateDayOne = e => {
            if (e.keyCode == 32) {
                this.day = new Day();
                this.playDay();
                document.removeEventListener("keyup", waitToCreateDayOne);
            }
        }
        
        document.addEventListener("keyup", waitToCreateDayOne);
    }

    playDay() {
        let game = this

        setTimeout(function() {
            game.renderForm();
        }, 3000)
        
        this.gameBoard.innerHTML = `<p class="title is-3 is-spaced has-text-centered">
                Lemonsville Weather Report
            </p>
            <p class="title is-3 has-text-centered">
                ${this.day.renderWeather}
            </p>
            <figure class="image is-5by4">
                <img src="images/lemonadestand.png" class="is-max-height-60" alt="lemonade stand graphic with two glasses and a pitcher of lemonade">            
            </figure>`;
    }

    renderForm() {
        this.gameBoard.innerHTML = this.day.renderDay
        let dayForm = document.getElementById("dayForm")
        dayForm.addEventListener("submit", e => {
            event.preventDefault();
            if (this.validateForm(e.target)) {
                this.submitDay(e.target);
            }
        });  
    }

    validateForm(dayData) {
        let glassesHelp = document.getElementById("glassesHelp");
        let signsHelp = document.getElementById("signsHelp")
        let chargeHelp = document.getElementById("chargeHelp")

        glassesHelp.innerText= ""
        signsHelp.innerText = ""
        chargeHelp.innerText = ""

        let invalidations = 0
        
        if (dayData.glasses.value < 0 || dayData.glasses.value >= 1000) {
            glassesHelp.innerText = "Come on, let's be reasonable now! Try again."
            invalidations++
        }
        
        if ((dayData.glasses.value * this.day.costOfLemonade * 0.01) > this.currentAssets) {
            glassesHelp.innerText = "Think again! You don't have enough cash"
            invalidations++;
        }
        
        if (dayData.signs.value < 0 || dayData.signs.value > 50) {
            signsHelp.innerText =
                "Come on, let's be reasonable now! Try again.";
            invalidations++;
        }
        
        if (((dayData.signs.value * this.day.costOfSigns * 0.01) + (dayData.glasses.value + this.day.costOfLemonade * 0.01)) > this.currentAssets) {
            signsHelp.innerText = `Think again! You don't have enough cash.`
            invalidations++;}

        if (dayData.charge.value < 0 || dayData.charge.value > 100) {
            chargeHelp.innerText = "Come on, let's be reasonable now! Try again."
            invalidations++
        }

        if (invalidations === 0) {
            return true;
        }
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
        if (formData.days_attributes.number === 1) {
            Api.submitNewGame(formData, this)
        } else {
            Api.submitNewDay(formData, this)
        }
        
    }

    applyResults(results) {
        this.gameId = results.data.id
        let attributes = results.data.attributes
        this.currentAssets = attributes.current_assets
        let days = results.data.attributes.days
        let dayAttributes = days[days.length - 1]
        this.day.glassesMade = dayAttributes.glasses_made
        this.day.chargePerGlass = dayAttributes.charge_per_glass
        this.day.signsMade = dayAttributes.signs_made
        this.day.glassesSold = dayAttributes.glasses_sold
        this.day.profits = dayAttributes.profits

        this.renderResults()
    }

    renderResults() {
            this.gameBoard.innerHTML = `<img src="images/favicon/android-chrome-192x192.png" alt="lemon emoji"><br><br>

            <p class="title is-2">
                Day ${this.day.number}
            </p>

            <p class="subtitle is-4">
                ${this.day.glassesSold} glasses sold
            </p>

            <p class="subtitle is-4">
                $${parseFloat(this.day.chargePerGlass * 0.01).toFixed(2)} charge per glass
            </p>

            <p class="subtitle is-3 has-text-right">
                Income: $${parseFloat(this.day.glassesSold * this.day.chargePerGlass * 0.01).toFixed(2)}
            </p>

            <p class="subtitle is-4">
                ${this.day.glassesMade} glasses made
            </p>

            <p class="subtitle is-4">
                ${this.day.signsMade} signs made
            </p>

            <p class="subtitle is-3 has-text-right">
                Expenses: $${parseFloat((this.day.glassesMade * this.day.costOfLemonade +
                  this.day.signsMade * this.day.costOfSigns) * 0.01).toFixed(2)}
            </p>

            <p class="title is-4 has-text-centered">
                Profit $${parseFloat(this.day.profits).toFixed(2)}    
            </p>
            
            <p class="title is-4 has-text-centered">
                Assets $${parseFloat(this.currentAssets).toFixed(2)}    
            </p>
            
            <p class="subtitle is-4">
                Press space to continue, esc to end...
            </p>`;

            let waitToCreateNextDay = e => {
                if (e.keyCode == 32) {
                    this.day = new Day(this.currentAssets, ++this.day.number);
                    this.playDay();
                    document.removeEventListener("keyup", waitToCreateNextDay);
                }
            };

            document.addEventListener("keyup", waitToCreateNextDay);

    }

    addExitListener() {
        document.addEventListener("keyup", e => {
            if (e.keyCode == 27) {
                // TODO: Create game exit
                let modal = document.getElementById("alert")
                modal.classList.add("is-active");
                document.addEventListener("click", e => {
                    modal.classList.remove("is-active")
                })
                document.addEventListener("keyup", e => {
                    if (e.keyCode == 13) {
                        if (this.gameId) {
                            Api.deleteGame(this.gameId);
                        } else {
                            window.location.reload()
                        }
                    } else if (e.keyCode == 32) {
                        modal.classList.remove("is-active")
                    }
                })

            }
        })
    }
}