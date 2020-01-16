class DaySerializer
  include FastJsonapi::ObjectSerializer
  set_type :day  # optional
  set_id :game_id # optional
  attributes :number, :weather, :cost_of_lemonade, :glasses_made, :cost_of_signs, :signs_made, :charge_per_glass, :glasses_sold, :profits
  belongs_to :game
end