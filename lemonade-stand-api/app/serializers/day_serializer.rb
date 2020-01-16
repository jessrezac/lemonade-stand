class DaySerializer
  include FastJsonapi::ObjectSerializer
  attributes :number, :profits
end
