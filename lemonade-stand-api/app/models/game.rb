class Game < ApplicationRecord
    has_many :days, :dependent => :delete_all
    accepts_nested_attributes_for :days

end
