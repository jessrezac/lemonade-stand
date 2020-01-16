class Game < ApplicationRecord
    has_many :days, :dependent => :delete_all

    after_initialize :init_day_one

    def init_day_one
        if new_record?
            self.days.build({number: 1})
        end
    end
    

end
