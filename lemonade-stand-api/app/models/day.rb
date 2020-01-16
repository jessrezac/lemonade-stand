class Day < ApplicationRecord
    belongs_to :game
    enum weather: [ :sunny, :hot_and_sunny, :cloudy, :thunderstorms ]
end
