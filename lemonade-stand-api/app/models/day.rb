class Day < ApplicationRecord
    belongs_to :game
    enum weather: [ :thunderstorms, :cloudy, :sunny, :hot_and_sunny ]

    after_create :play_game

    def calculate_glasses_sold
        # customer volume is determined by r * (n + (n * v)), then that amount is rounded
        # set charge_multiplier (n)
        if self.charge_per_glass <= 10 
            # if charge < 10 then 1200 N1 = (10 - profits) / 10 * .8 * 30 + 30
            charge_multiplier = (10 - self.charge_per_glass) / 10 * 0.8 * 30 + 30
        else
            # else n1 = (10 ^ 2) * 30 / profits ^ 2)
            charge_multiplier = (10**2) * 30 / self.charge_per_glass**2
        end

        # set signs multiplier (v)
        w = -self.signs_made * 0.5
        signs_multiplier = 1 - Math.exp(w)   # v = 1 - (exp(w) * 1)  //

        # set random event multiplier (r)
        case self.weather
        when "thunderstorms"
            # J = 30 + INT (RND(1) * 5) * 10 // that's the chance of rain
            # if it is rainy, R1 becomes 1 - J / 100

            chance_of_rain = 30 + (rand * 5).floor * 10
            random_event_multiplier = 1 - chance_of_rain/100
        when "hot and sunny"
            random_event_multiplier = 2
        else
            random_event_multiplier = 1
        end

        customers = (random_event_multiplier * (charge_multiplier + (charge_multiplier * signs_multiplier))).floor

        if customers >= self.glasses_made
            self.glasses_sold = self.glasses_made
        else
            self.glasses_sold = customers
        end
    end

    def calculate_profits
        expenses = (self.cost_of_lemonade * self.glasses_made) + (self.cost_of_signs * self.signs_made)
        income = self.glasses_sold * self.charge_per_glass
        self.profits = ((income - expenses) * 0.01).round(2)
    end

    private

    def play_game
        self.calculate_glasses_sold
        self.calculate_profits
        self.save
        self.game.current_assets += self.profits
        self.game.save
        if self.game.current_assets == 0 || self.number == 30
            self.game.complete = true
            self.game.save
        end
    end

end