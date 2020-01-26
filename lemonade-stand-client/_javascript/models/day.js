class Day {

    constructor(assets = 2.00, number = 1) {
        this.assets = assets
        this.number = number
        this.costOfSigns = 15
        this.setCostOfLemonade()
        this.generateWeather()
    }

    setCostOfLemonade () {            
        if (this.number > 6) {
            this.costOfLemonade = 5
        } else if (this.number > 2) {
            this.costOfLemonade = 4;
        } else {
            this.costOfLemonade = 2;
        }
    }

    generateWeather() {
        this.weather = Math.floor(Math.random() * 4);
    }

    get renderWeather() {
        switch (this.weather) {
            case 0:
                return "Thunderstorms"
                break;
            case 1:
                return "Cloudy"
                break;
            case 2:
                return "Sunny"
                break;
            case 3:
                return "Hot and Sunny"
                break;
            default:
                break;
        }
    }

    get renderDay() {

        return `<p class="title is-2">On Day ${
          this.number
        }, the cost of lemonade is $0.0${this.costOfLemonade}.</p>
        <p class="subtitle is-4">Assets $${this.assets.toFixed(2)}</p>
        
        <form class="form" id="dayForm">
            <div class="field">
                <label for="glasses" class="label is-large">How many glasses of lemonade do you wish to make?</label>
                <div class="control">
                    <input class="input is-large" type="number" placeholder="Number of Glasses" name="glasses">
                </div>
                <p class="help is-primary is-size-5" id="glassesHelp"></p>

                </div>
            <div class="field">
                <label for="signs" class="label is-large">How many advertising signs (15 cents each) do you want to make?</label>
                <div class="control">
                    <input class="input is-large" type="number" placeholder="Number of Signs" name="signs">
                </div>
                <p class="help is-primary is-size-5" id="signsHelp"></p>
            </div>
            <div class="field">
                <label for="charge" class="label is-large">What price (in cents) do you wish to charge for lemonade?</label>
                <div class="control">
                    <input class="input is-large" type="number" placeholder="Charge for Lemonade" name="charge">
                </div>
                <p class="help is-primary is-size-5" id="chargeHelp"></p>
            </div>
            <input id="submit-day-btn" class="button is-primary is-large" type="submit" value="Submit">
        </form>`;
    }
    
}