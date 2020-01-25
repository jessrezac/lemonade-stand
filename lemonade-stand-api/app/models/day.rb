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
        signs_multiplier = 1 - Math.exp(w)   # v = 1 - (exp(w) * 1)  // EXP is inverse natural log of the argument

        # set random event multiplier (r)
        case self.weather
        when "thunderstorms"
            # J = 30 + INT (RND(1) * 5) * 10 // that's the chance of rain
            # if it is rainy, R1 becomes 1 - J / 100

            chance_of_rain = 30 + (rand(1) * 5).floor * 10
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
    end




        # some glasses validations to consider (L(I)
        # if glasses made is < 0 or > 1000 then "Come on, Let's be reasonable now! Try again."
        # if glasses made is not an integer then ""
        # if glasses * cost < = assets then "Think again!!! You only have assets in cash and to make # glasses you need assets * cost in cash."

        # some signs validations to consider:
        # if S(I) < 0 or > 50 or not an integer then "Come on, be reasonable!!! Try again"
        # if signs * signs cost < = assets - lemonade * lemonade cost then "Think again!!!"
        
        # some price validations:
        # if P(I) < 0 or > 100 or not an integer then "Come on, be reasonable!!! Try again"

end