class DaySerializer
  include FastJsonapi::ObjectSerializer
  attributes :number, :eod_assets
end
