class Game < ApplicationRecord
    has_many :days, :dependent => :destroy_all

    after_initialize :init_day_one

    def init_day_one
        if new_record?
            self.days.create({number: 1})
        end
    end
    

end
