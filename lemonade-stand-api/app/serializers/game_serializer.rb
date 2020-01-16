class GameSerializer
  include FastJsonapi::ObjectSerializer
  set_type :game  # optional
  attributes :current_assets, :complete
  has_many :days
end