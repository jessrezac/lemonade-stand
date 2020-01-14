class Game < ApplicationRecord
    has_many :days

    def initialize
        self.current_assets = 2.00
    end
end
