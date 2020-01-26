class GameSerializer
  include FastJsonapi::ObjectSerializer
  set_type :game  # optional
  attributes :current_assets, :complete, :days
  has_many :days, serializer: :day
end