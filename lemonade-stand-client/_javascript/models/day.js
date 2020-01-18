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
}