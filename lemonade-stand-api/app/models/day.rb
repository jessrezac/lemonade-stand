require 'Math'

class Day < ApplicationRecord
    belongs_to :game
    enum weather: [ :thunderstorms, :cloudy, :sunny, :hot_and_sunny ]

    after_create :play_game

    private

    def play_game

        # customer volume is determined by r * (n + (n * v))

        # set n
        if self.charge_per_glass <= 10 
            # if charge < 10 then 1200 N1 = (10 - profits) / 10 * .8 * 30 + 30
            n = (10 - self.charge_per_glass) / 10 * .8 * 30 + 30
        else
            # else n1 = (10 ^ 2) * 30 / profits ^ 2)
            n = (10**2) * 30 / self.charge_per_glass**2
        end

        # set v
        v = 1 - (Math.log((self.signs_made * -1) * .5) * 1)   # v = 1 - (exp(w) * 1)  // EXP is inverse natural log of the argument

        # set chance of rain and r
        case self.weather
        when "thunderstorms"
            # J = 30 + INT (RND(1) * 5) * 10 // that's the chance of rain
            # if it is rainy, R1 becomes 1 - J / 100

            chance_of_rain = 30 + (Math.random(1) * 5).floor * 10
            r = 1 - chance_of_rain/100
        when "hot and sunny"
            r = 2
        else
            r = 1
        end

        customers = (r * (n + (n * v))).floor

        if customers > self.glasses_made
            self.glasses_sold = self.glasses_made
        else
            self.glasses_sold = customers
        end
        # n2 = glasses sold
        # m = n2 * price * .01
        # e = signs * cost of signs + lemonade * cost of lemonade
        # profits = m - e
        # assets = assets + profits



        # n2 = R1 * (N1 + (N1 * V))
        # if n2 < = lemonade made, then m = N2 * P(i) * .01
        # else n2 = L(I)
        # then calc profits

        # R1 is 1 at the start of each day
        # if it is sunny R1 becomes 2
        # if there is construction, then pick a random number and if it's less than .5, R1 = .1 otherwise R1 = 2 and the street crews buy all the lemonade at lunch





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
