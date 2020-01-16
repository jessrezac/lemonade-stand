class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :current_assets, :complete, :days
end
